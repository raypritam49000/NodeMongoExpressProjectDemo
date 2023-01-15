const express = require('express');
const route = express.Router();
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("../middleware/auth");
const { createCart, deleteCart, getAllCarts, getCardByUserId, updateCart } = require("../controllers/cart.controller");

route.post("/", verifyToken, createCart);
route.put("/:id", verifyTokenAndAuthorization, updateCart);
route.delete("/:id", verifyTokenAndAuthorization, deleteCart);
route.get("/find/:userId", verifyTokenAndAuthorization, getCardByUserId);
route.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = route;