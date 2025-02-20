import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded.id; // Attach user ID to request
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        res.status(401).json({ error: "Invalid token." });
    }
};

export default authMiddleware;
