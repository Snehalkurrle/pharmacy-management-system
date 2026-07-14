const userService = require("../services/user.service");
const generateToken = require("../utils/jwt");

// Register User
const registerUser = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const existingUser = await userService.getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const user = await userService.createUser({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatched = await userService.comparePassword(
            password,
            user.password
        );

        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate JWT Token
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};