const express = require('express');
const { createUser, updateUser, getUsers } = require('../controllers/userController');

const router = express.Router();

// Create user
router.post('/', createUser);

// Update user
router.put('/:id', updateUser);

// Get all users
router.get('/', getUsers);

module.exports = router;
