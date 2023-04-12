const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    employeeID: {type: String, required: true, unique: true},
    fullName: {type: String, required: true,},
    deptID: {type: String, required: true},
    position: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    supID: {type: String}
});

module.exports = mongoose.model('EMP', empSchema)