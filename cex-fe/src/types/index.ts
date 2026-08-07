export interface Stock {
  id: number;
  title: string;
  symbol: string;
  currentPrice?: number;
}

export interface UserBalance {
  available: number;
  locked: number;
}

export interface Portfolio {
  INR: UserBalance;
  [symbol: string]: UserBalance;
}

export interface FillHistory {
  id: number;
  symbol: string;
  side: "BUY" | "SELL";
  price: number;
  qty: number;
  createdAt: string;
}