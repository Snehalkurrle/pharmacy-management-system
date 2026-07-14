const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        console.log("\n========== AUTH MIDDLEWARE ==========");
        console.log("Authorization Header:", req.headers.authorization);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. Token not provided."
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded Token:", decoded);

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });

    }

};

module.exports = authMiddleware;