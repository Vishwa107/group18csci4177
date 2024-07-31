const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

// Import routes
const usersRouter = require('./routes/signup'); // Make sure this path is correct
const loginRouter = require('./routes/login'); // Update this if necessary

// Use routes
app.use('/users', usersRouter); // Update this path
app.use('/login', loginRouter);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
