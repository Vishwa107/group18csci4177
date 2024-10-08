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

router.put('/update-password', async (req, res) => {
  const { email, location, newPassword } = req.body;
  try {
    const user = await User.findOne({ email, location });
    if (user) {
      // Hash the new password
      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
      
      res.json({ message: 'Password updated successfully.' });
    } else {
      res.status(404).json({ message: 'Email or location does not match.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// router.put('/update-profile', async (req, res) => {
//   const { email, location, name } = req.body;
//   try {
//     const user = await User.findOne({ email, location, name });
//     if (user) {
      
//     user.name = name;
//     user.email = email;
//     user.location = location;
//     await user.save();
      
//       res.json({ message: 'Data updated successfully.' });
//     } else {
//       res.status(404).json({ message: 'Email or location does not match.' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.put('/update-profile', async (req, res) => {
  const { email, name, location } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
      // Update user details
      user.name = name || user.name;
      user.location = location || user.location;
      await user.save(); // Save the updated user

      // Respond with updated user info
      res.json({ success: true, user, message: 'Profile updated successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'User not found.' });
    }
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});


module.exports = router;
