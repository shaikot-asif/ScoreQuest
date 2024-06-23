const express = require("express");

const router = express.Router();

const {
  addSquad,
  getSquad,
  deleteSquad,
  getSquadBySquadId,
} = require("../controllers/squadController.js");

router.post("/addSquad", addSquad);

router.get("/getSquad", getSquad);

router.delete("/deleteSquad", deleteSquad);

router.get("/getSquadById", getSquadBySquadId);
module.exports = router;
