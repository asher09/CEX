import {Router} from "express";
import { getFillsHandler } from "../controllers/market.js";

const router = Router();

router.get("/fills/:symbol", getFillsHandler);

export default router;