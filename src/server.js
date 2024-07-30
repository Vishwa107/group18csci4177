const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:root@assignment3.ytyswow.mongodb.net/?retryWrites=true&w=majority&appName=assignment3')
.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
