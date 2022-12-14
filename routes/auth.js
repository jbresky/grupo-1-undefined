const express = require("express");
const { loginUser, me } = require("../controllers/auth");
const validateToken = require("../middlewares/token");

const router = express.Router();

router.get('/me', validateToken, me)
router.post("/login", loginUser);

module.exports = router;
