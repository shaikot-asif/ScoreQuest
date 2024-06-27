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
    console.log(user, "user");
    if (!user) {
      return res.status(404).json({ message: `${valueType} not found` });
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
    } else {
      return res.status(404).json({ message: "Invalid password" });
    }
  } catch (e) {
    console.log(e, "catch");
    next(e);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 2;
    const search = req.query.search || "";

    let users = await User.find({ name: { $regex: search, $options: "i" } })
      .skip(page * limit)
      .limit(limit);

    const response = {
      error: false,
      page: page + 1,
      limit,
      users,
    };

    console.log("response: ", response);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { registerUser, login, getAllUsers };
