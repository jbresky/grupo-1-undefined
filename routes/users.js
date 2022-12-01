const express = require('express')
const {
   get, deleteUser,
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)

router.delete('/:id', deleteUser)

module.exports = router