const mongoose = require('mongoose');

const fwaSchema = mongoose.Schema({
  employeeID: {type: String}, //required
  requestDate: {type: Date, required: true},
  workType:{type: String, required: true},
  description: {type: String, required: true},
  reason: {type: String, required: true},
  status: {type: String},
  comment: {type: String},
});

module.exports = mongoose.model('FWA', fwaSchema)
