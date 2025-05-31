import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, res, next) => {
    try {
        //get token
        const token = req.headers("Authoriation").replace("Bearer", "");
        if (!token) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Invalid token, authorization denied" });
        }

        req.user = user; // Attach user to request object
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default protectRoute;