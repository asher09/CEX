import type { Request, Response } from "express";
import { redisClient } from "../config/redis.js";
import { prisma } from "../config/db.js";
import type { CreateOrderRequest } from "../types/index.js";

export async function createOrderHandler(req: Request, res: Response): Promise<void> {
  const { userId, symbol, side, type, price, qty }: CreateOrderRequest = req.body;

  // validate stock
  const stock = await prisma.stock.findUnique({ where: { symbol } });
  if (!stock) {
    res.status(404).json({ message: "Stock symbol not found" });
    return;
  }

  // push incoming order payload to Redis queue
  const payload = JSON.stringify({
    userId,
    stockId: stock.id,
    symbol,
    side,
    type,
    price: type === "LIMIT" ? price : null,
    qty,
  });

  await redisClient.lPush("incoming-order", payload);

  res.status(202).json({ message: "Order queued successfully" });
}

export async function getUserOrdersHandler(req: Request, res: Response): Promise<void> {
  const userId = Number(req.query.userId);
  if (!userId) {
    res.status(400).json({ message: "userId query param required" });
    return;
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  res.json(orders);
}

export async function cancelOrderHandler(req: Request, res: Response): Promise<void> {
  const orderId = Number(req.params.orderId);

  // push cancellation to Redis queue 
  await redisClient.lPush(
    "incoming-order",
    JSON.stringify({ action: "CANCEL", orderId })
  );

  res.json({ message: "Cancellation queued", orderId });
}