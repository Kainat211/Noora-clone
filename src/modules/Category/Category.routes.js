// import express from "express";
// import {
//   createCategory,
//   getAllCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
// } from "./category.controller.js";
// import  verifyAccessToken  from "../../core/middleware/auth.middleware.js"; // adjust path if different

// const router = express.Router();

// // GET ALL CATEGORIES
// router.get("/", getAllCategories);

// // CREATE CATEGORY
// router.post("/",  createCategory);

// // GET CATEGORY BY ID
// router.get("/:id", getCategoryById);

// // UPDATE CATEGORY
// router.put("/:id",updateCategory);

// // DELETE CATEGORY
// router.delete("/:id",  deleteCategory);

// export default router;
import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./Category.controller.js";

import verifyAccessToken from "../../core/middleware/auth.middleware.js";
import uploadCategoryImage from "../../core/middleware/uploadProductImage.js";

const router = express.Router();

// GET ALL CATEGORIES
router.get("/", getAllCategories);

// CREATE CATEGORY — Multer added
router.post(
  "/",
  uploadCategoryImage.single("categoryImage"),
  createCategory
);

// GET CATEGORY BY ID
router.get("/:id", getCategoryById);

// UPDATE CATEGORY — Multer added
router.put(
  "/:id",
  uploadCategoryImage.single("categoryImage"),
  updateCategory
);

// DELETE CATEGORY
router.delete("/:id", deleteCategory);

export default router;