const User = require("../models/User.js");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    let user = await User.findOne({ $or: [{ email }, { phone }] });

    if (user) {
      //   throw new Error("User have already exist");
      return res.status(400).json({ message: "User have already exist" });
    }

    user = new User({
      name,
      email,
      phone,
      password,
    });

    await user.save();

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      phone: user.phone,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { valueType, value, password } = req.body;

    let user = await User.findOne({ [valueType]: value });
    if (!user) {
      throw new Error("Email or Phone are not found");
    }
    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        phone: user.phone,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { registerUser, login };
