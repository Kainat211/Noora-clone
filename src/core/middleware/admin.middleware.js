const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }
    if (req.user.userRole !== "admin") {

        return res.status(403).json({
            message:
                "Access denied. Admin only."
        });

    }

    next();

};
export default verifyAdmin;