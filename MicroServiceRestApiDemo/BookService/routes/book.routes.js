const express = require('express');
const router = express.Router();
const { findAll, create, findById, updateById, deleteById } = require('../controllers/book.controller');

router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);
router.put('/:id', updateById);
router.delete('/:id', deleteById);

module.exports = router;