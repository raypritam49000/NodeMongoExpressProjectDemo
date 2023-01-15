const express = require('express');
const route = express.Router();
const { createProduct, findProductByID, getAllProducts, deleteProduct, updateProduct } = require('../controllers/product.controller')
const { verifyTokenAndAdmin } = require("../middleware/auth");

route.post("/", verifyTokenAndAdmin, createProduct);
route.put("/:id", verifyTokenAndAdmin, updateProduct);
route.get("/find/:id", findProductByID);
route.get("/", getAllProducts);
route.delete("/:id", verifyTokenAndAdmin, deleteProduct);

module.exports = route;