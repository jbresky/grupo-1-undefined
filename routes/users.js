const express = require('express')
const { get, create } = require('../controllers/users')

// example of middleware application
const schemaValidator = require('../middlewares/schemaValidator')
const registration = require('../schemas/registration')

const router = express.Router()

router.get('/', get)
router.post('/', schemaValidator(registration), create)


module.exports = router