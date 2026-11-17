import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },

        userEmail: {
            type: String,
            required: true,
            unique: true,
        },

        userPassword: {
            type: String,
            required: true,
        },

        userRole: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },

        userIsVerified: {
            type: Boolean,
            default: false,
        },

        userVerificationToken: {
            type: String,
            default: null,
        },

        userVerificationTokenExpiry: {
            type: Date,
            default: null,
        },

        userRefreshToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);
// ==========================================
// PASSWORD HASH
// ==========================================
userSchema.pre("save", async function () {
    if (!this.isModified("userPassword")) {
        return;
    }

    this.userPassword = await bcrypt.hash(
        this.userPassword,
        10
    );

});


// ==========================================
// CHECK PASSWORD
// ==========================================

userSchema.methods.isPasswordCorrect = async function (
    password
) {

    return await bcrypt.compare(
        password,
        this.userPassword
    );

};
// ==========================================
// ACCESS TOKEN
// ==========================================
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            userEmail: this.userEmail,
            userRole: this.userRole,
        },
        process.env.ACCESS_TOKEN_SECRET,

        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );

};


// ==========================================
// REFRESH TOKEN
// ==========================================
userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,

        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );

};
// ==========================================
// VERIFICATION TOKEN
// ==========================================
userSchema.methods.generateVerificationToken = function () {
    const unHashedToken =
        crypto.randomBytes(20).toString("hex");
    const hashedToken =
        crypto
            .createHash("sha256")
            .update(unHashedToken)
            .digest("hex");

    const tokenExpiry = Date.now() + 15 * 60 * 1000;

    return {
        unHashedToken,
        hashedToken,
        tokenExpiry,
    };

};


// ==========================================
// MODEL
// ==========================================

const User = mongoose.model(
    "User",
    userSchema
);

export default User;