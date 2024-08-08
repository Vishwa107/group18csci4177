const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Ensure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET || 'gH9LfzN+P2X5Gz8rJ1N1Y6RzV8K6U4T2P5M7B4V9Q2N3A1C7D9W1H3K4P0';
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

// Handle login
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.error('Email or password not provided');
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.error('User not found');
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
      
      if (!bcrypt.compareSync(password, user.password)) {
        console.error('Password mismatch');
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
      
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    console.log('Received token:', token); // Debugging line
  
    if (!token) {
      console.error('No token provided');
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('Failed to authenticate token:', err);
        return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
      }
      req.userId = decoded.id;
      next();
    });
};  
  

// Get user info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId, { password: 0 }); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get user info error:', error); // Logging for debugging
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



// // Define the route for updating profile
// router.put('/update-profile', verifyToken, async (req, res) => {
//   const { name, email, location } = req.body;

//   if (!name || !email || !location) {
//     return res.status(400).json({ success: false, message: 'All fields are required' });
//   }

//   try {
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     user.name = name;
//     user.email = email;
//     user.location = location;
//     await user.save();

//     res.json({ success: true, message: 'Profile updated successfully' });
//   } catch (error) {
//     console.error('Update profile error:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });




module.exports = router;
