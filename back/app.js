const student = require('./router/student')
const cors = require("cors")
require('dotenv').config();

//Import the express module
const express = require('express')

//Create an app object
const app = express()

app.use(cors({  
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST','PUT'], 
  allowedHeaders: ['Content-Type'], 
  })
);

var bodyParser = require('body-parser');

app.use(bodyParser());
app.use('/api',student)

app.listen(3000,() => {
    console.log('Server open successfully')
})

