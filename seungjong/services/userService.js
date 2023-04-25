// services/userService.js
const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const password = "password";
const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const checkHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword); // (1)
};

const signUp = async (name, email, password, profileImg) => {
  const hashedPassword = await makeHash(password, 12);
  const result = await checkHash(password, hashedPassword);
  console.log(`1111111111`, hashedPassword);

  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImg
  );

  return createUser;
};

module.exports = { signUp };
