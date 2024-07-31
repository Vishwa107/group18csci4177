const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');

// Get all accommodations
router.get('/', async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.json(accommodations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
