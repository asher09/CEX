import {Router} from "express";
import { getStocksHandler } from "../controllers/stock.js";

const router = Router();

router.get("/stocks", getStocksHandler);

export default router;