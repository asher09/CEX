import {Router} from "express";
import authRoutes from "./auth.js"
import stockRoutes from "./stock.js"
import orderRoutes from "./order.js"
import marketRoutes from "./market.js"

const router = Router();

router.use(authRoutes);
router.use(stockRoutes)
router.use(orderRoutes)
router.use(marketRoutes)

export default router;