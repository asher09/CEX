import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

export async function getStocksHandler(_req: Request, res: Response): Promise<void> {
  const stocks = await prisma.stock.findMany();
  res.json(stocks);
}