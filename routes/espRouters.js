const express = require("express");
const router = express.Router();

const espDataController = require("../controllers/esp/espDataController");
const espDataIdController = require("../controllers/esp/espDataIdController");
const espSendIdDataController = require("../controllers/esp/espSendDataController");
const espDataUserIdController = require("../controllers/esp/espDataUserIdController");

router.use("/data", espDataUserIdController)
router.use("/data", espDataController);
router.use("/data", espDataIdController);
router.use("/sensor", espSendIdDataController);

module.exports = router;