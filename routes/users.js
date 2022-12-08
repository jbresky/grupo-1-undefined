const express = require('express')
const {
   get,
   create,
   editUser,
   getId
} = require('../controllers/users')

const { schemaValidator } = require('../middlewares/schemaValidator');
const { registration } = require('../schemas/registration');

const router = express.Router()

router.get('/', get)
router.post('/', schemaValidator(registration), create)
router.put('/:id', editUser)
router.get('/:id', getId)


module.exports = router