import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    productDescription: {
      type: String,
      required: true,
      trim: true,
    },

    productPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    productStock: {
      type: Number,
      required: true,
      min: 0,
    },

    productImage: {
      type: String,
      default: "",
    },

    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    productBrand: {
      type: String,
      required: true,
      trim: true,
    },

    productIsActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export default Product;