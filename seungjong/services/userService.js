// services/userService.js
const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const { passwordValidationCheck } = require("../utils/validationCheck");
const jwt = require("jsonwebtoken");

const signUp = async (name, email, password, profileImg) => {
  await passwordValidationCheck(password);
  const hashedPassword = await bcrypt.hash(password, 12);

  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImg
  );

  return createUser;
};

const logIn = async (email, password) => {
  const [user] = await userDao.getUserByEmail(email);

  if (!user || !bcrypt.compare(password, user.password)) {
    throw new Error("Invalid Email or Password");
  }
  return jwt.sign({ userId: user.id }, process.env.SECRETKEY);
};

module.exports = {
  signUp,
  logIn,
};
