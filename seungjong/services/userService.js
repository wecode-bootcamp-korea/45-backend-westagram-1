// services/userService.js
const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRETKEY;

const signUp = async (name, email, password, profileImg) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log(`1111111111`, hashedPassword);

  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImg
  );

  return createUser;
};

const checkHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const logIn = async (email, password) => {
  const [login] = await userDao.logIn(email);
  const hashed = login.password;
  const result = await checkHash(password, hashed);

  if (!result) {
    const error = new Error("Invalid User");
    error.statusCode = 400;
    throw error;
  }
  const payLoad = { userId: login.id };
  return jwt.sign(payLoad, secretKey);
};

module.exports = {
  signUp,
  logIn,
};
