const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({
    employeeID: {type: String, min: 3, max: 10, required: true, unique: true},
    fullName: {type: String, required: true,},
    deptID: {type: deptID, required: true},
    position: {type: position, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    supID: {type: String}
});

module.exports = mongoose.model('EMP', empSchema)