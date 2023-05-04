const express = require("express");
const router = express.Router();
const espController = require("../controllers/espController");

router.use("/", espController);

module.exports = router;