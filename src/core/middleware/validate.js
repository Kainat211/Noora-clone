import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ZodError } from "zod";

const validate = (schema) =>
    asyncHandler(async (req, res, next) => {
        try {
            if (schema?.safeParse) {
                schema.parse(req.body);
            } else {
                if (schema?.body) schema.body.parse(req.body);
                if (schema?.query) schema.query.parse(req.query);
                if (schema?.params) schema.params.parse(req.params);
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.issues.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                }));

                throw new ApiError(
                    400,
                    "Validation failed",
                    formattedErrors
                );
            }

            console.error("Validation error:", error);

            throw new ApiError(
                500,
                "Unexpected validation error",
                [{ message: error.message }]
            );
        }
    });

export { validate };