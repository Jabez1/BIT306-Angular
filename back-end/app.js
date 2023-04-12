const express = require('express');
const bodyParser = require('body-parser');
const FWA = require('./models/fwa');
const mongoose = require('mongoose');
const app = express();

mongoose.connect("mongodb+srv://jabez:QSzvM500U9d6NMJa@clusterf.t7ulcp1.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=> {
    console.log('connected to the database');
  })
  .catch((err)=>{
    console.log('connection failed', err);
});

app.use((req, res,next) =>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.post('/api/fwa', (req, res, next)=> {
  console.log(req.body);
  const fwa = new FWA({
    employeeID: req.body.employeeID,
    requestID: req.body.requestID,
    requestDate: req.body.requestDate,
    workType: req.body.workType,
    description: req.body.description,
    reason: req.body.reason,
    status: req.body.status,
    comment: req.body.comment,
  });
  fwa.save();
  console.log(fwa);
  res.status(201).json({
    message: 'FWA added successfully'
  })
});

//add new employee
app.post('api/emp', (req, res, next)=> {
  console.log(req.body);
  const emp = new EMP({
    employeeID: req.body.employeeID,
    fullName: req.body.fullName,
    deptID: req.body.deptID,
    position: req.body.position,
    email: req.body.email,
    supID: req.body.supID
  });
  emp.save();
  console.log(emp);
  res.status(201).json({
    message: 'Employee added successfully' 
  })
});

module.exports= app;
