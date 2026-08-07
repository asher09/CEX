import { createClient } from "redis";
import { Orderbook } from "./engine/orderbook.js";
import type { IncomingOrderMessage } from "./types/index.js";
import { lockBalance } from "./engine/balances.js";

// In-memory orderbooks per symbol
const ORDERBOOKS: Record<string, Orderbook> = {
  AXIS: new Orderbook("AXIS"),
  HDFC: new Orderbook("HDFC"),
  TATA: new Orderbook("TATA"),
};

const redisClient = createClient();
redisClient.on("error", (err) => console.error("Redis Engine Error", err));

async function startEngine() {
  await redisClient.connect();
  console.log("🚀 Orderbook Engine connected to Redis. Waiting for orders...");

  while (true) {
    try {
      // Blocking pop from the 'incoming-order' queue (0 timeout = wait indefinitely)
      const response = await redisClient.brPop("incoming-order", 0);

      if (response) {
        const orderData: IncomingOrderMessage = JSON.parse(response.element);
        const { symbol, side, type, price, qty, userId } = orderData;

        const orderbook = ORDERBOOKS[symbol];
        if (!orderbook) {
          console.error(`Orderbook for symbol ${symbol} not found.`);
          continue;
        }

        // 1. Lock funds prior to engine entry
        if (side === "BUY") {
          const estimatedCost = (price ?? 0) * qty;
          const locked = lockBalance(userId, "INR", estimatedCost);
          if (!locked) {
            console.warn(`Insufficient INR balance for User ${userId}`);
            continue;
          }
        } else {
          const locked = lockBalance(userId, symbol, qty);
          if (!locked) {
            console.warn(`Insufficient ${symbol} balance for User ${userId}`);
            continue;
          }
        }

        // 2. Execute Order Matching
        const result = orderbook.processOrder(userId, side, type, price, qty);
        console.log(`[ORDER MATCHED] Result for ${symbol}:`, result);
      }
    } catch (err) {
      console.error("Error processing queue message:", err);
    }
  }
}

startEngine();