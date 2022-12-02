const express = require('express')
const {
   get, getId,
   create
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)
router.post('/', create)

router.get('/:id', getId)


module.exports = router