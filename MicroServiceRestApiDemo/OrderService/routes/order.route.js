const express = require('express');
const router = express.Router();
const {createOrder,findById} = require('../controllers/order.controller');

router.post('/',createOrder);
router.get('/:id',findById);

module.exports = router;