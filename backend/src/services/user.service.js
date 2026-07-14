const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// Create User
const createUser = async (userData) => {

    // Hash Password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;

    return await User.create(userData);

};

// Find User By Email
const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Find User By ID
const getUserById = async (id) => {
    return await User.findById(id);
};

// Compare Password
const comparePassword = async (enteredPassword, hashedPassword) => {
    return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = {
    createUser,
    getUserByEmail,
    getUserById,
    comparePassword
};