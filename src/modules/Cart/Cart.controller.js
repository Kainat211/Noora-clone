import mongoose from "mongoose";

import Cart from "../../models/Cart.model.js";
import Product from "../../models/Product.model.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { ApiError } from "../../core/utils/api-error.js";
import { ApiResponse } from "../../core/utils/api-response.js";

// Cart total calculate karna
const calculateTotal = (items) =>
    items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

// 1. Add product to cart
const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user?.id || req.user?._id;

    if (!mongoose.isValidObjectId(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    if (
        !Number.isInteger(quantity) ||
        quantity < 1
    ) {
        throw new ApiError(400, "Quantity must be a positive integer");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    if (product.productIsActive === false) {
        throw new ApiError(400, "Product is not available");
    }

    if (quantity > product.productStock) {
        throw new ApiError(400, "Not enough product stock");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [],
        });
    }

    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.productStock) {
            throw new ApiError(400, "Not enough product stock");
        }

        existingItem.quantity = newQuantity;
        existingItem.price = product.productPrice;
    } else {
        cart.items.push({
            product: product._id,
            quantity,
            price: product.productPrice,
        });
    }

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    res.status(200).json(
        new ApiResponse(200, cart, "Product added to cart successfully")
    );
});

// 2. Get logged-in user's cart
const getMyCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user?.id || req.user?._id })
        .populate("items.product", "productName productPrice productImage");

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    res.status(200).json(
        new ApiResponse(200, cart, "Cart fetched successfully")
    );
});

// 3. Update item quantity
const updateCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new ApiError(400, "Quantity must be a positive integer");
    }

    const cart = await Cart.findOne({ user: req.user?.id || req.user?._id });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!item) {
        throw new ApiError(404, "Product not found in cart");
    }

    const product = await Product.findById(productId);

    if (!product || product.productIsActive === false) {
        throw new ApiError(404, "Product is not available");
    }

    if (quantity > product.productStock) {
        throw new ApiError(400, "Not enough product stock");
    }

    item.quantity = quantity;
    item.price = product.productPrice;
    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    res.status(200).json(
        new ApiResponse(200, cart, "Cart quantity updated successfully")
    );
});

// 4. Remove item from cart
const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const cart = await Cart.findOne({ user: req.user?.id || req.user?._id });

    if (!cart) {
        throw new ApiError(404, "Cart not found");
    }

    const itemExists = cart.items.some(
        (item) => item.product.toString() === productId
    );

    if (!itemExists) {
        throw new ApiError(404, "Product not found in cart");
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    cart.totalAmount = calculateTotal(cart.items);

    await cart.save();

    res.status(200).json(
        new ApiResponse(200, cart, "Product removed from cart successfully")
    );
});

export {
    addToCart,
    getMyCart,
    updateCartItem,
    removeCartItem,
};