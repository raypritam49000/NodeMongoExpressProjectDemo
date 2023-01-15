const express = require("express");
const route = express.Router();
const { createCategory} = require("../controllers/category.controller")
const { auth } = require("../middlewares/auth");

route.post('/createCategory', auth, createCategory);

module.exports = route;