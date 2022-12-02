const express = require('express')
const {
   get,
   create,
   editUser,
   getId
} = require('../controllers/users')

const router = express.Router()

router.get('/', get)
router.post('/', create)
router.put('/:id', editUser)
router.get('/:id', getId)


module.exports = router