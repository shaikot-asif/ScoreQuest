const express = require("express");

const router = express.Router();
const { authGuard } = require("../middleware/authMiddleware");

const {
  addANewMatch,
  updateMatch,
  getMatchByRequestingTeamId,
  getMatchByRequestedTeamId,
  cancelMatch,
} = require("../controllers/matchController.js");

router.post("/addMatch", authGuard, addANewMatch);
router.put("/updateMatch", authGuard, updateMatch);
router.get("/requestingTeam", authGuard, getMatchByRequestingTeamId);
router.get("/requestedTeam", authGuard, getMatchByRequestedTeamId);
router.delete("/deleteMatch", authGuard, cancelMatch);

module.exports = router;
