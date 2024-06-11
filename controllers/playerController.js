const Player = require("../models/Player.js");

const addPlayer = async (req, res, next) => {
  try {
    const { firstName, lastName, birthday, role, avatar, userId } = req.body;

    let player = Player({
      firstName,
      lastName,
      birthday,
      role,
      avatar,
      userId,
    });

    player.save();

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

module.exports = { addPlayer };
