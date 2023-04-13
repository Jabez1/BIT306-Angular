const express = require('express');
const bodyParser = require('body-parser');
const FWA = require('./models/fwa');
const EMP = require('./models/emp');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const checkAuth = require('./middleware/check-auth');
const app = express();
var cors = require('cors')

app.use(bodyParser.json());
app.use(cors());

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



//FWA Functions
app.post('/api/fwa', (req, res, next)=> {
  console.log(req.body);
  const fwa = new FWA({
    employeeID: req.body.employeeID,
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

app.get('/api/fwa', (req, res, next) =>{
  FWA.find().then(documents => {
    res.status(200).json({
      message: 'FWA fetched successfully',
      fwaList: documents
    })
  })
});

app.put('/api/fwa/:id', checkAuth, (req, res, next) =>{
  const fwa = new FWA({
    _id: req.body.id,
    employeeID: req.body.employeeID,
    requestDate: req.body.requestDate,
    workType: req.body.workType,
    description: req.body.description,
    reason: req.body.reason,
    status: req.body.status,
    comment: req.body.comment,
  });
  FWA.updateOne({ _id: req.params.id }, fwa).then(result => {
    console.log(result);
    res.status(200).json({message : "Update successful!"});
  })
})

//add new employee

app.post('/api/employee/login', (req, res, next) => {
  let fetchedEmp;
  EMP.findOne({employeeID: req.body.employeeID})
    .then(emp => {
      if(!emp){
        return res.status(401).json({
          message: 'Auth failed - employee does not exist'
        });
      }
      fetchedEmp = emp
      return bcrypt.compare(req.body.password, emp.password)
    })
    .then(result=>{
      if(!result){
        return res.status(401).json({
          message: 'Auth failed - password didnt match'
        })
      }
    const token = jwt.sign(
      {employeeID: fetchedEmp.employeeID, userId: fetchedEmp._id},
      'secret_this_should_be_longer',
      {expiresIn: '1h'}
    );
    res.status(200).json({
      emp: fetchedEmp,
      token: token
    })
    })
    .catch (err =>{
      return res.status(401).json({
        message: 'Auth failed'
      })
    })
});

app.post('/api/employee/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash =>{
      const employee = new EMP({
        employeeID: req.body.employeeID,
        fullName: req.body.name,
        deptID: req.body.deptID,
        position: req.body.position,
        FWAStatus: req.body.FWAStatus,
        Status: req.body.Status,
        comment: req.body.comment,
        supID: req.body.supervisorID,
        email: req.body.email,
        password: hash
      });
      employee.save()
        .then(result => {
          res.status(201).json({
            message: 'Employee Created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
})

module.exports= app;
