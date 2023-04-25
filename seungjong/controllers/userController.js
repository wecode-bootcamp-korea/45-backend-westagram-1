const userService = require("../services/userService");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImg } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Key_Error" });
    }

    await userService.signUp(name, email, password, profileImg);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.logIn(email, password);
    return res.status(200).json({ accessToken: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
