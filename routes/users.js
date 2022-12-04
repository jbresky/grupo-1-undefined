const express = require('express')
const {
   get,
   create,
   editUser,
   getId,
   deleteUser,
   loginUser
} = require('../controllers/users')

const { schemaValidator } = require('../middlewares/schemaValidator');
const { registration } = require('../schemas/registration');

const router = express.Router()

router.get('/', get)
router.post('/', schemaValidator(registration), create)
router.put('/:id',schemaValidator(registration), editUser)
router.get('/:id', getId)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)

module.exports = router