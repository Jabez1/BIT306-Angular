const mongoose = require('mongoose');

const fwaSchema = mongoose.Schema({
  employeeID: {type: String, required: true},
  requestDate: {type: Date, required: true},
  workType:{type: String, required: true},
  description: {type: String, required: true},
  reason: {type: String, required: true},
  status: {type: Number, required: true},
  comment: {type: String},
});

module.exports = mongoose.model('FWA', fwaSchema)
