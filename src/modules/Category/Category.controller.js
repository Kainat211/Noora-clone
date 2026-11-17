import mongoose from "mongoose";
import Category from "../../models/Category.model.js";

// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { categoryName, categoryDescription } = req.body;

    // Get uploaded image path
    const categoryImage = req.file
      ? `/uploads/categories/${req.file.filename}`
      : "";

    const category = await Category.create({
      categoryName,
      categoryDescription,
      categoryImage,
    });

    return res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// GET ALL CATEGORIES
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// GET CATEGORY BY ID
export const getCategoryById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const updates = {};

    // Update text fields only when provided
    if (req.body.categoryName !== undefined) {
      updates.categoryName = req.body.categoryName;
    }

    if (req.body.categoryDescription !== undefined) {
      updates.categoryDescription = req.body.categoryDescription;
    }

    // Replace image only when a new file is uploaded
    if (req.file) {
      updates.categoryImage =
        `/uploads/categories/${req.file.filename}`;
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const category = await Category.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};