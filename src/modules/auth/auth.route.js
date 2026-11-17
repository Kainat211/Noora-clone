
import { Router } from "express";
import { validate } from "../../core/middleware/validate.js";
import {
    registerSchema,
    loginSchema,
} from "../../shared/validators/user.validator.js";
import {
    registerUser,
    loginUser,
} from "./auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerUser);
authRouter.post("/login", validate(loginSchema), loginUser);

export default authRouter;
