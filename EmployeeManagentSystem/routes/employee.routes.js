const express = require("express");
const route = express.Router();
const EmployeeController = require("../controllers/employee.controller");

route.post('/createEmployee',EmployeeController.createEmployee);
route.get('/getAllEmployees',EmployeeController.getAllEmployees);
route.get('/getEmployee/:id',EmployeeController.getEmployee);
route.delete('/deleteEmployee/:id',EmployeeController.deleteEmployee);
route.put('/updateEmployee/:id',EmployeeController.updateEmployee);

module.exports = route;