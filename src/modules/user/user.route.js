import express from "express";

import { validate } from "../../core/middleware/validate.js";
import verifyAccessToken from "../../core/middleware/auth.middleware.js";
import verifyAdmin from "../../core/middleware/admin.middleware.js";

import { registerSchema } from "../../shared/validators/user.validator.js";

import {
    registerUser,
    loginUser,
    verifyEmail,
    getAllUsers,
    updateUser,
    deleteUser
} from "./user.controller.js";

const router = express.Router();

// Public Routes
router.post(
    "/register",
    validate(registerSchema),
    registerUser
);

router.post(
    "/login",
    loginUser
);

router.get(
    "/verify-email/:token",
    verifyEmail
);

// Protected Route
router.get(
    "/",
    verifyAccessToken,
    getAllUsers
);

router.put(
    "/update/:id",
    verifyAccessToken,
    updateUser
);

// Admin Only
router.delete(
    "/delete/:id",
    verifyAccessToken,
    verifyAdmin,
    deleteUser
);

export default router;