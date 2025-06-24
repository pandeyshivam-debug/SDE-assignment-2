import User from "../models/user.js"
import generateToken from "../utils/generateToken.js"
import bcrypt from "bcryptjs"

export const signup = async (req, res) => {
    const { username, email, password} = req.body

    try {
        const existing = await User.findOne({email})
        if(existing) {
            return res.status(400).json({message: "Email already exists"})
        }
        // const user = await User.create({username, email, password})
        const user = new User({ username, email, password })
        await user.save()


        const token = generateToken(user._id)
        res.status(200).json({ token })
    } catch(err) {
        console.error("signup error", err)
        return res.status(500).json({
            success: false,
            message: "server error"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" })

        const token = generateToken(user._id)
        return res.status(200).json({ token })
    } catch (err) {
        console.error("Login error:", err)
        res.status(500).json({ message: "Server error" });
    }
}

// export default signup