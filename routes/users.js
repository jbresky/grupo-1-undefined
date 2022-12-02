const express = require('express')
const {
   get,
   create,
   editUser
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)
router.post('/', create)
router.put('/:id', editUser)


module.exports = router