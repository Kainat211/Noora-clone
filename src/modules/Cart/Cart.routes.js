import express from "express";

import {
    addToCart,
    getMyCart,
    updateCartItem,
    removeCartItem,
} from "./Cart.controller.js";

import verifyAccessToken from "../../core/middleware/auth.middleware.js";

const router = express.Router();

// Har cart route ke liye login/token required hai
router.use(verifyAccessToken);
router.post("/", addToCart);
router.get("/getmyCart", getMyCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);

export default router;