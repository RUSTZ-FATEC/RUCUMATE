const express = require("express");
const router = express.Router();
const createNotificationController = require("../controllers/notification/createNotificationController");
const getNotificationController = require("../controllers/notification/getNotificationController");

router.use("/", createNotificationController);
router.use("/", getNotificationController);

module.exports = router;