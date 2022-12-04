const express = require('express');
const { get, createCategory } = require('../controllers/categories');

const router = express.Router();

router.get('/', get);
router.post('/', createCategory)
module.exports = router;