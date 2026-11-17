
import { asyncHandler } from "../../core/utils/async-handler.js";
import User from "../../models/User.model.js";
import { ApiResponse } from "../../core/utils/api-response.js";
import { ApiError } from "../../core/utils/api-error.js";

// REGISTER USER
const registerUser = asyncHandler(async (req, res) => {
    const { userName, userEmail, userPassword, userRole } = req.body;

    const existingUser = await User.findOne({ userEmail });

    if (existingUser) {
        throw new ApiError(400, "User with this email already exists");
    }

    // User model ka pre-save middleware password hash karega
    const user = await User.create({
        userName,
        userEmail,
        userPassword,
        ...(userRole ? { userRole } : {}),
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            {
                _id: user._id,
                userName: user.userName,
                userEmail: user.userEmail,
                userRole: user.userRole,
            },
            "User registered successfully"
        )
    );
});

// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { userEmail, userPassword } = req.body;

    const user = await User.findOne({
        userEmail: userEmail.trim().toLowerCase(),
    });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await user.isPasswordCorrect(userPassword);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.userRefreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
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

export { registerUser, loginUser };
