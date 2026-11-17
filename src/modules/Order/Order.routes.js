import { Router } from "express";

import {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} from "./Order.controller.js";

import verifyAccessToken from "../../core/middleware/auth.middleware.js";

const router = Router();

// All order routes are protected
router.use(verifyAccessToken);

// Create order
router.post("/", createOrder);

// Get all my orders
router.get("/", getMyOrders);

// Get single order
router.get("/:orderId", getOrderById);

// Cancel pending order
router.put("/:orderId", updateOrderStatus);

// Delete cancelled order
router.delete("/:orderId", deleteOrder);

export default router;