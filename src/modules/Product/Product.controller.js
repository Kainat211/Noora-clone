import mongoose from "mongoose";
import Product from "../../models/Product.model.js";
import Category from "../../models/Category.model.js";

const allowedFields = [
  "productName",
  "productDescription",
  "productPrice",
  "productStock",
  "productCategory",
  "productBrand",
  "productIsActive",
];

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productStock,
      productCategory,
      productBrand,
      productIsActive,
    } = req.body;

    // Validate category ID
    if (!mongoose.isValidObjectId(productCategory)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    // Check category exists
    const category = await Category.findById(productCategory);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    // Get image path from Multer
    const productImage = req.file
      ? `/uploads/products/${req.file.filename}`
      : "";

    const product = await Product.create({
      productName,
      productDescription,
      productPrice,
      productStock,
      productImage,
      productCategory,
      productBrand,
      productIsActive,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "productCategory",
      "categoryName"
    );

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id).populate(
      "productCategory",
      "categoryName"
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const updates = {};

    // Only allow approved fields
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Update image only when a new file is uploaded
    if (req.file) {
      updates.productImage = `/uploads/products/${req.file.filename}`;
    }

    // Validate category if being updated
    if (updates.productCategory !== undefined) {
      if (!mongoose.isValidObjectId(updates.productCategory)) {
        return res.status(400).json({
          message: "Invalid category ID",
        });
      }

      const category = await Category.findById(
        updates.productCategory
      );

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    ).populate("productCategory", "categoryName");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid product ID",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};