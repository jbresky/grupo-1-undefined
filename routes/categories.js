const express = require('express');
const { get, deleteCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.delete('/:id', deleteCategory);

module.exports = router;