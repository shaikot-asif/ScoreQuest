const express = require("express");

const router = express.Router();

const { addPlayer } = require("../controllers/playerController.js");
const { authGuard } = require("../middleware/authMiddleware");

router.post("/addPlayer", authGuard, addPlayer);

module.exports = router;
