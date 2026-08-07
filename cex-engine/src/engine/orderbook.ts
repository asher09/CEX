import { BookOrder, PriceLevel, OrderSide, OrderType } from "../types/index.js";
import { BALANCES, initializeUserBalance } from "./balances.js";

export class Orderbook {
  symbol: string;
  bids: Record<number, PriceLevel> = {}; // Buy orders (keyed by price desc)
  asks: Record<number, PriceLevel> = {}; // Sell orders (keyed by price asc)
  private currentOrderId = 1;

  constructor(symbol: string) {
    this.symbol = symbol;
  }

  // --- Process Limit / Market Order ---
  public processOrder(
    userId: number,
    side: OrderSide,
    type: OrderType,
    price: number | null,
    qty: number
  ) {
    initializeUserBalance(userId);
    let remainingQty = qty;
    const orderId = this.currentOrderId++;

    if (side === "BUY") {
      remainingQty = this.matchBuyOrder(userId, type, price, remainingQty);
      
      // If LIMIT order and unfulfilled quantity remains, rest order on the book
      if (remainingQty > 0 && type === "LIMIT" && price !== null) {
        this.addLimitOrder("bids", price, {
          orderId,
          userId,
          price,
          qty,
          filledQty: qty - remainingQty,
        });
      }
    } else {
      // SELL Side
      remainingQty = this.matchSellOrder(userId, type, price, remainingQty);

      if (remainingQty > 0 && type === "LIMIT" && price !== null) {
        this.addLimitOrder("asks", price, {
          orderId,
          userId,
          price,
          qty,
          filledQty: qty - remainingQty,
        });
      }
    }

    return { orderId, remainingQty, executedQty: qty - remainingQty };
  }

  private matchBuyOrder(
    buyerId: number,
    type: OrderType,
    limitPrice: number | null,
    qty: number
  ): number {
    let remainingQty = qty;

    // Sort ask prices ascending (lowest ask first)
    const sortedAskPrices = Object.keys(this.asks)
      .map(Number)
      .sort((a, b) => a - b);

    for (const askPrice of sortedAskPrices) {
      if (remainingQty <= 0) break;

      // Stop matching if it's a limit order and lowest ask is higher than limit
      if (type === "LIMIT" && limitPrice !== null && askPrice > limitPrice) {
        break;
      }

      const priceLevel = this.asks[askPrice];

      for (let i = 0; i < priceLevel.orders.length; i++) {
        const askOrder = priceLevel.orders[i];
        const unfulfilledAskQty = askOrder.qty - askOrder.filledQty;
        const fillQty = Math.min(remainingQty, unfulfilledAskQty);

        // --- Execute Settlement ---
        this.settleTrade(buyerId, askOrder.userId, askPrice, fillQty);

        askOrder.filledQty += fillQty;
        priceLevel.totalQty -= fillQty;
        remainingQty -= fillQty;

        // Remove fully filled order from book
        if (askOrder.filledQty === askOrder.qty) {
          priceLevel.orders.splice(i, 1);
          i--;
        }

        if (remainingQty <= 0) break;
      }

      // Clean empty price level
      if (priceLevel.orders.length === 0) {
        delete this.asks[askPrice];
      }
    }

    return remainingQty;
  }

  private matchSellOrder(
    sellerId: number,
    type: OrderType,
    limitPrice: number | null,
    qty: number
  ): number {
    let remainingQty = qty;

    // Sort bid prices descending (highest bid first)
    const sortedBidPrices = Object.keys(this.bids)
      .map(Number)
      .sort((a, b) => b - a);

    for (const bidPrice of sortedBidPrices) {
      if (remainingQty <= 0) break;

      if (type === "LIMIT" && limitPrice !== null && bidPrice < limitPrice) {
        break;
      }

      const priceLevel = this.bids[bidPrice];

      for (let i = 0; i < priceLevel.orders.length; i++) {
        const bidOrder = priceLevel.orders[i];
        const unfulfilledBidQty = bidOrder.qty - bidOrder.filledQty;
        const fillQty = Math.min(remainingQty, unfulfilledBidQty);

        // --- Execute Settlement ---
        this.settleTrade(bidOrder.userId, sellerId, bidPrice, fillQty);

        bidOrder.filledQty += fillQty;
        priceLevel.totalQty -= fillQty;
        remainingQty -= fillQty;

        if (bidOrder.filledQty === bidOrder.qty) {
          priceLevel.orders.splice(i, 1);
          i--;
        }

        if (remainingQty <= 0) break;
      }

      if (priceLevel.orders.length === 0) {
        delete this.bids[bidPrice];
      }
    }

    return remainingQty;
  }

  private addLimitOrder(bookSide: "bids" | "asks", price: number, order: BookOrder) {
    const book = this[bookSide];
    if (!book[price]) {
      book[price] = { totalQty: 0, orders: [] };
    }
    book[price].orders.push(order);
    book[price].totalQty += order.qty - order.filledQty;
  }

  private settleTrade(buyerId: number, sellerId: number, price: number, qty: number) {
    const totalCost = price * qty;

    // Move INR: Buyer locked -> Seller available
    BALANCES[buyerId].INR.locked -= totalCost;
    BALANCES[sellerId].INR.available += totalCost;

    // Move Stock: Seller locked -> Buyer available
    BALANCES[sellerId][this.symbol].locked -= qty;
    BALANCES[buyerId][this.symbol].available += qty;

    console.log(`[FILL] ${qty} ${this.symbol} @ ₹${price} (Buyer: ${buyerId}, Seller: ${sellerId})`);
  }
}