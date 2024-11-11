const User = require('../models/user');
const logger = require('../utils/logger');

// Create a new user
const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        logger.info(`User created: ${name} (${email})`);
        return res.status(201).json(newUser);
    } catch (err) {
        logger.error('Error creating user:', err);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

// Update a user by ID
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, { name, email, age, updatedAt: Date.now() }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        logger.info(`User updated: ${name} (${email})`);
        return res.status(200).json(updatedUser);
    } catch (err) {
        logger.error('Error updating user:', err);
        return res.status(500).json({ message: 'Error updating user' });
    }
};

// Get list of all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        logger.error('Error fetching users:', err);
        return res.status(500).json({ message: 'Error fetching users' });
    }
};

module.exports = { createUser, updateUser, getUsers };
