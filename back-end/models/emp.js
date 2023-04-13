const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
  employeeID: {type: String, min: 3, max: 10, required: true, unique: true},
  password: {type: String, required: true},
  fullName: {type: String, required: true,},
  deptID: {type: String, required: true},
  position: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  FWAStatus: {type: String},
  Status: {type: String},
  comment: {type: String},
  supID: {type: String}
});

module.exports = mongoose.model('EMP', empSchema)
