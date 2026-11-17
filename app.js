import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { errorHandler } from "./src/core/middleware/errorHandler.js";

import authRouter from "./src/modules/auth/auth.route.js";
import userRouter from "./src/modules/user/user.route.js";
import categoryRouter from "./src/modules/category/Category.routes.js";

import productRoutes from "./src/modules/Product/Product.routes.js";


import cartRoutes from "./src/modules/Cart/Cart.routes.js";


import addressRoutes from "./src/modules/Address/Address.routes.js";


import orderRoutes from "./src/modules/Order/Order.routes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.resolve("uploads")));

// API Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/orders", orderRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Server is running smoothly - Module Structure",
    timestamp: new Date().toISOString(),
  });
});

// Error Handler
app.use(errorHandler);

export default app;