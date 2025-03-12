// controllers/userController.js
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

// Register function to handle user registration logic
export const register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please provide all fields');
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create a new user
    const user = await User.create({
        name,
        email,
        password, // Password will be hashed before saving (handled in the user schema)
    });

    // Return a success response with the user data
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});


// Login function to handle user authentication
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Check if the provided password matches the stored password
    if (user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return a success response with user data (without JWT)
    return res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

export const editProfile = async (req, res) => {
    const { id, name, email, password } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = password; // Ensure you hash the password before saving
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const profile = async (req, res) => {
    const { id } = req.query;

    try {
        const product = await User.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
