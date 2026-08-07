import type { Request, Response } from "express";
import { prisma } from "../config/db.js";

export async function signupHandler(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    res.status(400).json({ message: "Username already taken" });
    return;
  }

  const user = await prisma.user.create({
    data: { username, password },
  });

  res.status(201).json({ message: "User created", userId: user.id });
}

export async function loginHandler(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || user.password !== password) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  res.json({ message: "Login successful", userId: user.id });
}