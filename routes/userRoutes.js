const express = require("express");
const router = express.Router();
const { authGuard } = require("../middleware/authMiddleware");

const {
  registerUser,
  login,
  getAllUsers,
  getUser,
} = require("../controllers/userControllers.js");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/getAllUsers", authGuard, getAllUsers);
router.get("/getUser", authGuard, getUser);
module.exports = router;
