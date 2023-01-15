const express = require('express');
const route = express.Router();
const { register, login, updateUser, getUserById, deleteUserById, getAllUsers, getUserStatus } = require('../controllers/user.controller')
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/auth");

route.post("/auth/register", register);
route.post("/auth/login", login);
route.put("/:id", verifyTokenAndAuthorization, updateUser);
route.get("/find/:id", verifyTokenAndAdmin, getUserById);
route.get("/", verifyTokenAndAdmin, getAllUsers);
route.delete("/:id", verifyTokenAndAuthorization, deleteUserById);
route.get("/stats", verifyTokenAndAdmin, getUserStatus);


module.exports = route;