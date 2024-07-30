const express = require("express");
const router = express.Router();
const Hero = require("../models/StudentModel");

// mongoose.js
const mongoose = require("mongoose");


require('dotenv').config();


const uri = 'mongodb+srv://root:root@assignment3.ytyswow.mongodb.net/?retryWrites=true&w=majority&appName=assignment3';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => 
  console.log('MongoDB connected successfully'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// check student information
router.post("/student/list", (req, res) => {

  Hero.find({...req.body})
    .sort({ update_at: -1 })
    .then(students => {
    console.log(students,'students')
      res.json(students);
    })
    .catch(err => {
      res.json(err);
    });
});

//renew the student database
router.put("/student/:id", (req, res) => {
  Hero.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        status : req.body.status,
      }
    },
    {
      new: true
    }
  )
    .then(student => res.json(student))
    .catch(err => res.json(err));
});

module.exports = router;


