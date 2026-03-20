import { User } from "../Model/model.js";
import bcrypt from "bcrypt";

// Yeh middleware check karta hai ke email pehle se exist toh nahi karta
// Aur password ko hash karta hai before saving
export const registerMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check: email already registered?
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email pehle se registered hai" });
        }

        // Password hash karo aur req.body mein replace karo
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;

        next(); // Controller ko bhejo
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
