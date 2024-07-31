const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  term: { type: String, required: true },
});

module.exports = mongoose.model('Accommodation', accommodationSchema);
