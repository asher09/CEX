import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

export async function getFillsHandler(req: Request, res: Response): Promise<void> {
  const symbol = req.params.symbol as string;

  if (!symbol) {
    res.status(400).json({ message: "Symbol is required" });
    return;
  }

  const stock = await prisma.stock.findUnique({ where: { symbol } });
  if (!stock) {
    res.status(404).json({ message: "Stock not found" });
    return;
  }

  const fills = await prisma.fill.findMany({
    where: { stockId: stock.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  res.json(fills);
}