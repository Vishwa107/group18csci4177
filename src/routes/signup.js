const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
router.post('/', async (req, res) => { // Change this to root to match '/users'
  const { email, password, name, location } = req.body;
  
  if (!email || !password || !name || !location) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword, // Save the hashed password
      name,
      location // Save the location if needed
    });

    await newUser.save();
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
