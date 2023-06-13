const express = require("express");
const router = express.Router();
const userRegisterController = require("../controllers/user/userRegisterController");
const userLoginController = require("../controllers/user/userLoginController");

router.use("/register", userRegisterController);
router.use("/login", userLoginController);

module.exports = router;