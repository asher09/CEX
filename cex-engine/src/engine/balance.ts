import type { UserBalances } from "../types/index.js";

// Global in-memory balance store: { [userId]: { INR: {available, locked}, AXIS: {...} } }
export const BALANCES: Record<number, UserBalances> = {};

export function initializeUserBalance(userId: number): void {
  if (!BALANCES[userId]) {
    BALANCES[userId] = {
      INR: { available: 500000, locked: 0 }, // Seed dummy initial funds
      AXIS: { available: 10, locked: 0 },
      HDFC: { available: 10, locked: 0 },
      TATA: { available: 10, locked: 0 },
    };
  }
}

export function lockBalance(
  userId: number,
  asset: string,
  amount: number
): boolean {
  initializeUserBalance(userId);
  const userAsset = BALANCES[userId][asset];

  if (!userAsset || userAsset.available < amount) {
    return false; // Insufficient funds
  }

  userAsset.available -= amount;
  userAsset.locked += amount;
  return true;
}

export function unlockBalance(userId: number, asset: string, amount: number): void {
  if (BALANCES[userId]?.[asset]) {
    BALANCES[userId][asset].locked -= amount;
    BALANCES[userId][asset].available += amount;
  }
}