const express = require('express');
const { get, createCategory, getId, editCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.put('/:id', editCategory);
router.post('/', createCategory);
router.get('/:id', getId);

module.exports = router;