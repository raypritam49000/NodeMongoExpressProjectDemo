const express = require("express");
const route = express.Router();
const {current_user } = require("../controllers/profile.controller")
const { auth } = require("../middlewares/auth");

route.get('/current-user', auth, current_user);

module.exports = route;