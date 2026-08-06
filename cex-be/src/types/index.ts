export interface CreateOrderRequest {
  userId: number;
  symbol: string;
  side: "BUY" | "SELL";
  type: "LIMIT" | "MARKET";
  price?: number;
  qty: number;
}