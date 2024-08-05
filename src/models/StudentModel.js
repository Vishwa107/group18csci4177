const mongoose = require('mongoose')

const ObjectId = require('mongodb').ObjectId;

/*Define the data model, you can see that we create a table below, the data in the table has name, age, sex and other fields, 
Cand the data type of these fields is also defined, and finally the model can be exported*/
const studentSchema = mongoose.Schema({
  id : ObjectId,
  name :String,
  age : Number,
  class: Number,
  hobby : String,
  speciality : String,
  status : String,
}, { collection: 'student'})

// //export the model
const Student  = mongoose.model('student',studentSchema);

 module.exports = Student