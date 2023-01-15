const express = require("express");
const { login, me } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/token");

const router = express.Router();

router.get('/me', verifyToken, me)
router.post('/login', login);

module.exports = router;
