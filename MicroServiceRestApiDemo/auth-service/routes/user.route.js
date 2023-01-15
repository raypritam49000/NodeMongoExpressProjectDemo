const express = require('express');
const router = express.Router();
const {login,register,findById} = require('../controllers/user.controller');

router.post('/login',login);
router.post('/register',register);
router.get('/findById/:id',findById);

module.exports = router;