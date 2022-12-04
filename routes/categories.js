const express = require('express');
const { get, editCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.put('/:id', editCategory);

module.exports = router;