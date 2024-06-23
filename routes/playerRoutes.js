const express = require("express");

const router = express.Router();

const {
  addPlayer,
  getAllPlayersByUserId,
  updatePlayerById,
  getPlayerByPlayerId,
  deletePlayer,
} = require("../controllers/playerController.js");
const { authGuard } = require("../middleware/authMiddleware");
const { uploadPicture } = require("../middleware/uploadPictureMiddleware.js");

router.post(
  "/addPlayer",
  authGuard,
  uploadPicture.single("profilePicture"),
  addPlayer
);
router.get("/getPlayer", getPlayerByPlayerId);
router.get("/getPlayers", getAllPlayersByUserId);

router.put(
  "/updatePlayer",
  uploadPicture.single("profilePicture"),
  updatePlayerById
);

router.delete("/deletePlayer", deletePlayer);
module.exports = router;
