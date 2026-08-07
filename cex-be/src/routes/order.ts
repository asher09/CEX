import {Router} from "express";

const router = Router();

router.post("/order", createOrderHandler);
router.get("/orders", getUserOrderHandler);
router.delete("/order/:orderId", cancelOrderHandler);

export default router;