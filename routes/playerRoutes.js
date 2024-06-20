const express = require("express");

const router = express.Router();

const {
  addPlayer,
  getAllPlayersByUserId,
  updatePlayerById,
} = require("../controllers/playerController.js");
const { authGuard } = require("../middleware/authMiddleware");
const { uploadPicture } = require("../middleware/uploadPictureMiddleware.js");

router.post(
  "/addPlayer",
  authGuard,
  uploadPicture.single("profilePicture"),
  addPlayer
);
router.get("/getPlayers", getAllPlayersByUserId);

router.put(
  "/updatePlayer",
  uploadPicture.single("profilePicture"),
  updatePlayerById
);
module.exports = router;
