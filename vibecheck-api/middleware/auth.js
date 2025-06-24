import jwt from "jsonwebtoken"
import User from "../models/user.js"

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" })
    }

    try {
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        next()
    } catch (err) {
        console.error("JWT Error:", err.message)
        res.status(401).json({ message: "Token failed" })
    }
}

export default protect;