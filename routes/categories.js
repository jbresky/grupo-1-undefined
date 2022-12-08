const express = require('express');
const { get, createCategory, getId, editCategory, deleteCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.delete('/:id', deleteCategory);
router.put('/:id', editCategory);
router.post('/', createCategory);
router.get('/:id', getId);

module.exports = router;