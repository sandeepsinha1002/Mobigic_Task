const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');
const generateToken = require('../config/generateToken');

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      // User with the provided username already exists
      return res.status(200).json("exist");
    }

    // If the user doesn't exist, create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate a token for the newly registered user
    // const token = generateToken();

    // Send a success response along with the token
    res.status(201).json({ message: "notexist" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);
    
    // Send an error response
    res.status(500).json("fail");
  }
});

module.exports = router;


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });

    if (!user) {
      // User with the provided username doesn't exist
      return res.status(401).json("user not found");
    }

    // Validate the password (you might want to use a secure authentication method here)
    if (user.password !== password) {
      // Incorrect password
      return res.status(401).json("incorrect password");
    }

    // Generate a token for the authenticated user
    const token = generateToken(user._id);

    // Send a success response along with the token
    res.status(200).json({ message: "exist", token });
  } catch (error) {
    // Log the error for debugging purposes
    console.error(error);

    // Send an error response
    res.status(500).json("login failed");
  }
});

module.exports = router;

router.get('/logout', (req, res) => {
  // Implement logout logic here
});

module.exports = router;
