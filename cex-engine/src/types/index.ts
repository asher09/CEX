export type OrderSide = "BUY" | "SELL";
export type OrderType = "LIMIT" | "MARKET";

export interface IncomingOrderMessage {
  action?: "CREATE" | "CANCEL";
  userId: number;
  stockId: number;
  symbol: string;
  side: OrderSide;
  type: OrderType;
  price: number | null;
  qty: number;
  orderId?: number;
}

export interface BookOrder {
  orderId: number;
  userId: number;
  price: number;
  qty: number;
  filledQty: number;
}

export interface PriceLevel {
  totalQty: number;
  orders: BookOrder[];
}

export interface AssetBalance {
  available: number;
  locked: number;
}

export interface UserBalances {
  [assetSymbol: string]: AssetBalance; // e.g., "INR", "AXIS", "HDFC"
}