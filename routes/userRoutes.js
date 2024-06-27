const express = require("express");
const router = express.Router();

const {
  registerUser,
  login,
  getAllUsers,
} = require("../controllers/userControllers.js");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
module.exports = router;
