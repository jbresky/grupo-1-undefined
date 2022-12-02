const express = require('express')
const {
   get,
   create
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)
router.post('/', create)


module.exports = router