import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {

    try {

        // 1. Get Authorization header

        const authHeader =
            req.headers.authorization;


        // 2. Check if header exists

        if (!authHeader) {

            return res.status(401).json({

                message:
                    "Access token is required"

            });

        }


        // 3. Check Bearer format

        if (!authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                message:
                    "Authorization header must use Bearer token"

            });

        }


        // 4. Extract token

        const accessToken =
            authHeader.split(" ")[1];


        // 5. Verify token

        const decoded =
            jwt.verify(

                accessToken,

                process.env.ACCESS_TOKEN_SECRET

            );


        // 6. Store decoded user in request

        req.user = decoded;
        // 7. Move to next middleware/controller

        next();

    } catch (error) {
    console.error("JWT ERROR:", error.message);

    return res.status(401).json({
        message: error.message
    });
}

};


export default verifyAccessToken;