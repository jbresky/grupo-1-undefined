const express = require('express')
const {
   listAll,
   listOne
} = require('../controllers/transactions')

const router = express.Router()

router.get('/listAll', listAll)
router.get('/listOne/:id', listOne)

module.exports = router