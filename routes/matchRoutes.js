const express = require("express");

const router = express.Router();

const {
  addANewMatch,
  updateMatch,
} = require("../controllers/matchController.js");

router.post("/addMatch", addANewMatch);
router.put("/updateMatch", updateMatch);

module.exports = router;
