const express = require("express");
const router = express.Router();
const Hero = require("../models/StudentModel");

// check student information
router.post("/student/list", (req, res) => {

  Hero.find({...req.body})
    .sort({ update_at: -1 })
    .then(students => {
      res.json(students);
    })
    .catch(err => {
      res.json(err);
    });
});

//renew the student database
router.post("/student/update", (req, res) => {
  Hero.findOneAndUpdate(
    { _id: req.body.id },
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


