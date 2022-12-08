const express = require('express')
const usersRouter = require('./users')
const transactionsRouter = require('./transactions')
const categoriesRouter = require('./categories')
const authRouter = require('./auth')
const uploadRouter = require('./upload')

const router = express.Router()

// example of a route with index controller get function
router.use('/users', usersRouter)
router.use('/transactions', transactionsRouter)
router.use('/categories', categoriesRouter)
router.use('/auth', authRouter)
router.use('/upload', uploadRouter)

module.exports = router
