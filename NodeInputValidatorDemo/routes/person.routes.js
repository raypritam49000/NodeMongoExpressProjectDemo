const express = require('express');
const route = express.Router();
const personController = require('../controllers/person.controller');

route.post('/createPerson', personController.createPerson);
route.get('/getAllPersons', personController.getAllPersons);
route.get('/getPerson/:id', personController.getPersonById);
route.put('/updatePerson/:id', personController.updatePerson);
route.delete('/deletePerson/:id', personController.deletePerson);

module.exports = route;