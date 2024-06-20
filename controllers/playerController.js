const Player = require("../models/Player.js");
const { fileRemover } = require("../utils/fileRemover.js");

const addPlayer = async (req, res, next) => {
  try {
    const { firstName, lastName, birthday, role, userId } = req.body;
    const avatar = req.file ? req.file.filename : "";

    let player = new Player({
      firstName,
      lastName,
      birthday,
      role,
      avatar,
      userId,
    });

    await player.save();

    return res.status(201).json({
      playerId: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      birthday: player.birthday,
      role: player.role,
      avatar: player.avatar,
      userId: player.userId,
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const getAllPlayersByUserId = async (req, res, next) => {
  try {
    const { userId } = req.body;

    const player = await Player.find(userId);

    res.send(player);
  } catch (error) {
    console.log(error);
  }
};

const updatePlayerById = async (req, res, next) => {
  try {
    const { firstName, lastName, birthday, role, playerId } = req.body;
    const avatar = req.file ? req.file.filename : "";

    let player = await Player.findById(playerId);

    console.log("updatePlayer: ", player, "avatar: ", avatar);

    if (!player) {
      throw new Error("player not found");
    }

    if (avatar) {
      fileRemover(player.avatar);
    }

    player.firstName = firstName || player.firstName;
    player.lastName = lastName || player.lastName;
    player.birthday = birthday || player.birthday;
    player.role = role || player.role;
    player.avatar = avatar || player.avatar;

    await player.save();

    console.log(firstName, lastName, birthday, role, playerId);

    return res.status(200).json({
      playerId: player._id,
      firstName: player.firstName,
      lastName: player.lastName,
      birthday: player.birthday,
      role: player.role,
      avatar: player.avatar,
      userId: player.userId,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addPlayer, getAllPlayersByUserId, updatePlayerById };
