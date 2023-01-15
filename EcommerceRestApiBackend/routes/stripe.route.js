const express = require('express');
const { payment } = require('../controllers/strip.controller');
const route = express.Router();

route.get('/payment',payment)

module.exports = route;