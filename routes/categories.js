const express = require('express');
const { get, createCategory, getId } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.post('/', createCategory);
router.get('/:id', getId);

module.exports = router;