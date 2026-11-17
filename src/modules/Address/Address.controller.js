import mongoose from "mongoose";
import Address from "../../models/Address.model.js";
import { asyncHandler } from "../../core/utils/async-handler.js";
import { ApiError } from "../../core/utils/api-error.js";
import { ApiResponse } from "../../core/utils/api-response.js";

// CREATE ADDRESS
const createAddress = asyncHandler(async (req, res) => {
    const {
        fullName,
        phoneNumber,
        addressLine,
        city,
        postalCode,
        country,
        isDefault = false,
    } = req.body;

    if (
        !fullName ||
        !phoneNumber ||
        !addressLine ||
        !city ||
        !postalCode ||
        !country
    ) {
        throw new ApiError(400, "All address fields are required");
    }

    const existingAddress = await Address.findOne({
        user: req.user?.id || req.user?._id
    });

    const address = await Address.create({
        user: req.user?.id || req.user?._id,
        fullName,
        phoneNumber,
        addressLine,
        city,
        postalCode,
        country,
        isDefault: isDefault || !existingAddress,
    });

    if (address.isDefault) {
        await Address.updateMany(
            { user: req.user.id, _id: { $ne: address._id } },
            { isDefault: false }
        );
    }

    res.status(201).json(
        new ApiResponse(201, address, "Address created successfully")
    );
});

// GET MY ADDRESSES
const getMyAddresses = asyncHandler(async (req, res) => {
    const addresses = await Address.find({
        user: req.user.id,
    });

    res.status(200).json(
        new ApiResponse(200, addresses, "Addresses fetched successfully")
    );
});

// UPDATE ADDRESS
const updateAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    if (!mongoose.isValidObjectId(addressId)) {
        throw new ApiError(400, "Invalid address ID");
    }

    const {
        fullName,
        phoneNumber,
        addressLine,
        city,
        postalCode,
        country,
        isDefault,
    } = req.body;

    const address = await Address.findOne({
        _id: addressId,
        user: req.user.id,
    });

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    if (fullName !== undefined) address.fullName = fullName;
    if (phoneNumber !== undefined) address.phoneNumber = phoneNumber;
    if (addressLine !== undefined) address.addressLine = addressLine;
    if (city !== undefined) address.city = city;
    if (postalCode !== undefined) address.postalCode = postalCode;
    if (country !== undefined) address.country = country;

    if (isDefault === true) {
        await Address.updateMany(
            { user: req.user?.id || req.user?._id, _id: { $ne: address._id } },
            { isDefault: false }
        );
        address.isDefault = true;
    } else if (isDefault === false) {
        address.isDefault = false;
    }

    await address.save();

    res.status(200).json(
        new ApiResponse(200, address, "Address updated successfully")
    );
});

// DELETE ADDRESS
const deleteAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;

    if (!mongoose.isValidObjectId(addressId)) {
        throw new ApiError(400, "Invalid address ID");
    }

    const address = await Address.findOneAndDelete({
        _id: addressId,
        user: req.user.id,
    });

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    res.status(200).json(
        new ApiResponse(200, address, "Address deleted successfully")
    );
});

export {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
};