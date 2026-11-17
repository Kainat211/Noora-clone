import crypto from "node:crypto";

import User from "../../models/User.model.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { ApiError } from "../../core/utils/api-error.js";
import { ApiResponse } from "../../core/utils/api-response.js";
import { mailTransporter } from "../../shared/helpers/mail.helper.js";
import { userVerificationMailBody } from "../../shared/helpers/userVerificationMailBody.js";

// ========================================
// 1. REGISTER USER
// ========================================
const registerUser = asyncHandler(async (req, res) => {
    const {
        userName,
        userEmail,
        userPassword,
        userRole
    } = req.body;

    if (
        typeof userName !== "string" ||
        !userName.trim() ||
        typeof userEmail !== "string" ||
        !userEmail.trim() ||
        typeof userPassword !== "string" ||
        !userPassword
    ) {
        throw new ApiError(
            400,
            "Username, email, and password are required"
        );
    }

    const normalizedEmail = userEmail.trim().toLowerCase();

    const existingUser = await User.findOne({
        userEmail: normalizedEmail,
    });

    if (existingUser) {
        throw new ApiError(409, "Email already registered");
    }

    // User.model.js automatically hashes the password
    const user = await User.create({
        userName: userName.trim(),
        userEmail: normalizedEmail,
        userPassword,
        userRole,
    });

    const {
        unHashedToken,
        hashedToken,
        tokenExpiry,
    } = user.generateVerificationToken();

    user.userVerificationToken = hashedToken;
    user.userVerificationTokenExpiry = tokenExpiry;

    await user.save();

    const verificationUrl =
        `http://localhost:3000/api/v1/users/verify-email/${unHashedToken}`;

    const emailBody = userVerificationMailBody(
        user.userName,
        verificationUrl
    );

    await mailTransporter.sendMail({
        from: process.env.MAIL_FROM || "no-reply@example.com",
        to: user.userEmail,
        subject: "Verify Your Email",
        html: emailBody,
    });

    res.status(201).json(
        new ApiResponse(
            201,
            {
                _id: user._id,
                userName: user.userName,
                userEmail: user.userEmail,
                userRole: user.userRole,
            },
            "User registered successfully. Please verify your email."
        )
    );
});

// ========================================
// 2. LOGIN USER
// ========================================
const loginUser = asyncHandler(async (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (
        typeof userEmail !== "string" ||
        !userEmail.trim() ||
        typeof userPassword !== "string" ||
        !userPassword
    ) {
        throw new ApiError(
            400,
            "Email and password are required"
        );
    }

    const user = await User.findOne({
        userEmail: userEmail.trim().toLowerCase(),
    });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordCorrect =
        await user.isPasswordCorrect(userPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid email or password");
    }

    if (!user.userIsVerified) {
        throw new ApiError(403, "Please verify your email first");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.userRefreshToken = refreshToken;
    await user.save();

    res.status(200).json(
        new ApiResponse(
            200,
            {
                user: {
                    _id: user._id,
                    userName: user.userName,
                    userEmail: user.userEmail,
                    userRole: user.userRole,
                },
                accessToken,
                refreshToken,
            },
            "Login successful"
        )
    );
});

// ========================================
// 3. VERIFY EMAIL
// ========================================
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if (!token) {
        throw new ApiError(
            400,
            "Verification token is required"
        );
    }

    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        userVerificationToken: hashedToken,
        userVerificationTokenExpiry: {
            $gt: Date.now(),
        },
    });

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired verification token"
        );
    }

    user.userIsVerified = true;
    user.userVerificationToken = null;
    user.userVerificationTokenExpiry = null;

    await user.save();

    res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Email verified successfully"
        )
    );
});

// ========================================
// 4. GET ALL USERS
// ========================================
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select(
        "-userPassword -userRefreshToken -userVerificationToken -userVerificationTokenExpiry"
    );

    res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );
});

// ========================================
// 5. UPDATE USER
// ========================================
const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const currentUserId = req.user?.id || req.user?._id;
    const currentUserRole = req.user?.role || req.user?.userRole;

    if (
        !currentUserId ||
        (
            currentUserId.toString() !== id &&
            currentUserRole !== "admin"
        )
    ) {
        throw new ApiError(
            403,
            "You are not allowed to update this user"
        );
    }
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const {
        userName,
        userEmail,
        userRole,
    } = req.body;

    if (userName !== undefined) {
        if (typeof userName !== "string" || !userName.trim()) {
            throw new ApiError(400, "Invalid username");
        }

        user.userName = userName.trim();
    }

    if (userEmail !== undefined) {
        if (typeof userEmail !== "string" || !userEmail.trim()) {
            throw new ApiError(400, "Invalid email");
        }

        user.userEmail = userEmail.trim().toLowerCase();
    }

    // Only an existing admin can change roles
    if (currentUserRole === "admin" && userRole !== undefined) {
        if (!["admin", "user"].includes(userRole)) {
            throw new ApiError(400, "Invalid user role");
        }
        user.userRole = userRole;
    }
    await user.save();
    res.status(200).json(
        new ApiResponse(
            200,
            {
                _id: user._id,
                userName: user.userName,
                userEmail: user.userEmail,
                userRole: user.userRole,
            },
            "User updated successfully"
        )
    );
});

// ========================================
// 6. DELETE USER
// ========================================
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await User.findByIdAndDelete(id);

    res.status(200).json(
        new ApiResponse(
            200,
            null,
            "User deleted successfully"
        )
    );
});

// ========================================
// EXPORT FUNCTIONS
// ========================================
export {
    registerUser,
    loginUser,
    verifyEmail,
    getAllUsers,
    updateUser,
    deleteUser,
};