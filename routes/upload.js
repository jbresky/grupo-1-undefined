const express = require("express");
const { uploadFile, upload } = require("../controllers/upload");
const router = express.Router();

router.post("/", upload.single("fileName"), uploadFile);

module.exports = router;
