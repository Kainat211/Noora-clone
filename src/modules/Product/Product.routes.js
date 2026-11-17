
import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./Product.controller.js";

import verifyAccessToken from "../../core/middleware/auth.middleware.js";
import verifyAdmin from "../../core/middleware/admin.middleware.js";
import uploadProductImage from "../../core/middleware/uploadProductImage.js";

const router = Router();

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// GET PRODUCT BY ID
router.get("/:id", verifyAccessToken, getProductById);

// CREATE PRODUCT - ADMIN ONLY + IMAGE UPLOAD
router.post(
  "/",
  verifyAccessToken,
  verifyAdmin,
  uploadProductImage.single("productImage"),
  createProduct
);

// UPDATE PRODUCT - ADMIN ONLY + OPTIONAL NEW IMAGE
router.put(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  uploadProductImage.single("productImage"),
  updateProduct
);

// DELETE PRODUCT - ADMIN ONLY
router.delete(
  "/:id",
  verifyAccessToken,
  verifyAdmin,
  deleteProduct
);

export default router;
