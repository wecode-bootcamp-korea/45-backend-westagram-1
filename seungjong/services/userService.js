// services/userService.js
const userDao = require("../models/userDao");

const { passwordValidationCheck } = require("../utils/validationCheck");

const signUp = async (name, email, password, profileImg) => {
  await passwordValidationCheck(password);

  const createUser = await userDao.createUser(
    name,
    email,
    password,
    profileImg
  );

  return createUser;
};

module.exports = { signUp };
