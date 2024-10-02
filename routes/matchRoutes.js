const express = require("express");

const router = express.Router();
const { authGuard } = require("../middleware/authMiddleware");

const {
  addANewMatch,
  updateMatch,
  getMatchByRequestingTeamId,
  getMatchByRequestedTeamId,
  cancelMatchByRequestingUser,
  rejectMatchByRequestedUser,
  acceptMatchByRequestedUser,
} = require("../controllers/matchController.js");

router.post("/addMatch", authGuard, addANewMatch);
router.get("/requestingTeam", authGuard, getMatchByRequestingTeamId);
router.get("/requestedTeam", authGuard, getMatchByRequestedTeamId);
router.put(
  "/rejectMatchByRequestedUser",
  authGuard,
  rejectMatchByRequestedUser
);
router.put(
  "/acceptMatchByRequestedUser",
  authGuard,
  acceptMatchByRequestedUser
);
router.delete(
  "/cancelMatchByRequestingUser",
  authGuard,
  cancelMatchByRequestingUser
);

module.exports = router;
