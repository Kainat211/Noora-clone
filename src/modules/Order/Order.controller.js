import mongoose from "mongoose";
import Order from "../../models/Order.model.js";
import Product from "../../models/Product.model.js";
import Address from "../../models/Address.model.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { ApiError } from "../../core/utils/api-error.js";
import { ApiResponse } from "../../core/utils/api-response.js";

// CREATE ORDER
const createOrder = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod = "COD" } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
        throw new ApiError(400, "Order must contain products");
    }

    if (!mongoose.isValidObjectId(shippingAddress)) {
        throw new ApiError(400, "Invalid shipping address ID");
    }

    if (!["COD", "Online"].includes(paymentMethod)) {
        throw new ApiError(400, "Invalid payment method");
    }

    const address = await Address.findOne({
        _id: shippingAddress,
        user: req.user?.id || req.user?._id,
    });

    if (!address) {
        throw new ApiError(404, "Shipping address not found");
    }

    const savedItems = [];

    for (const item of orderItems) {
        if (
            !mongoose.isValidObjectId(item.product) ||
            !Number.isInteger(item.quantity) ||
            item.quantity < 1
        ) {
            throw new ApiError(400, "Invalid product ID or quantity");
        }

        const product = await Product.findById(item.product);

        if (!product || product.productIsActive === false) {
            throw new ApiError(404, "Product not found or unavailable");
        }

        if (item.quantity > product.productStock) {
            throw new ApiError(400, `Not enough stock for ${product.productName}`);
        }

        savedItems.push({
            product: product._id,
            productName: product.productName,
            quantity: item.quantity,
            price: product.productPrice,
            subtotal: product.productPrice * item.quantity,
        });
    }

    const totalAmount = savedItems.reduce(
        (total, item) => total + item.subtotal,
        0
    );

    const order = await Order.create({
        user: req.user?.id || req.user?._id,
        orderItems: savedItems,
        shippingAddress,
        totalAmount,
        paymentMethod,
    });

    res.status(201).json(
        new ApiResponse(201, order, "Order created successfully")
    );
});

// GET MY ORDERS
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user?.id || req.user?._id })
        .populate("shippingAddress");

    res.status(200).json(
        new ApiResponse(200, orders, "Orders fetched successfully")
    );
});

// GET SINGLE ORDER
const getOrderById = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    if (!mongoose.isValidObjectId(orderId)) {
        throw new ApiError(400, "Invalid order ID");
    }

    const order = await Order.findOne({
        _id: orderId,
        user: req.user?.id || req.user?._id,
    }).populate("shippingAddress");

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    res.status(200).json(
        new ApiResponse(200, order, "Order fetched successfully")
    );
});

// UPDATE ORDER STATUS
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    if (!mongoose.isValidObjectId(orderId)) {
        throw new ApiError(400, "Invalid order ID");
    }

    if (!allowedStatuses.includes(orderStatus)) {
        throw new ApiError(400, "Invalid order status");
    }

    const order = await Order.findOne({
        _id: orderId,
        user: req.user?.id || req.user?._id,
    });

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    // User can cancel only a pending order.
    if (orderStatus !== "Cancelled" || order.orderStatus !== "Pending") {
        throw new ApiError(
            403,
            "You can only cancel a pending order"
        );
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json(
        new ApiResponse(200, order, "Order cancelled successfully")
    );
});

// DELETE ORDER
const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;

    if (!mongoose.isValidObjectId(orderId)) {
        throw new ApiError(400, "Invalid order ID");
    }

    const order = await Order.findOne({
        _id: orderId,
        user: req.user?.id || req.user?._id,
    });

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    if (order.orderStatus !== "Cancelled") {
        throw new ApiError(
            400,
            "Only cancelled orders can be deleted"
        );
    }

    await order.deleteOne();

    res.status(200).json(
        new ApiResponse(200, null, "Order deleted successfully")
    );
});

export {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};