import { Router } from "express";

import {
    createAddress,
    getMyAddresses,
    updateAddress,
    deleteAddress,
} from "./Address.controller.js";

import verifyAccessToken from "../../core/middleware/auth.middleware.js";

const router = Router();

router.use(verifyAccessToken);

router.post("/", createAddress);
router.get("/", getMyAddresses);
router.put("/:addressId", updateAddress);
router.delete("/:addressId", deleteAddress);

export default router;