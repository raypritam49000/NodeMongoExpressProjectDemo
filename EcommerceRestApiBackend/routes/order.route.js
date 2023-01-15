const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/auth");
const express = require("express");
const route = express.Router();
const { createOrder, updateOrder,deleteOrder,getOrderById,getAllOrders,getMonthlyIncome } = require("../controllers/order.controller");

route.post("/", verifyToken, createOrder);
route.put("/:id", verifyTokenAndAdmin, updateOrder);
route.delete("/:id", verifyTokenAndAdmin,deleteOrder);
route.get("/find/:userId", verifyTokenAndAuthorization,getOrderById); 
route.get("/", verifyTokenAndAdmin,getAllOrders); 
route.get("/income", verifyTokenAndAdmin,getMonthlyIncome); 

module.exports = route;