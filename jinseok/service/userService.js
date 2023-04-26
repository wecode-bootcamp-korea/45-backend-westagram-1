const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDao = require('../model/userDao');
const {
  pwValidationCheck,
  emailValidationCheck,
} = require('../utils/validation-check.js');

const signUp = async (
  email,
  profileImage,
  password,
  name,
  age,
  phoneNumber
) => {
  await pwValidationCheck(password);
  await emailValidationCheck(email);

  const saltRounds = parseInt(process.env.SALT_ROUNDS);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createUser = await userDao.createUser(
    email,
    profileImage,
    hashedPassword,
    name,
    age,
    phoneNumber
  );

  return createUser;
};

const login = async (email, password) => {
  await emailValidationCheck(email);

  const user = await userDao.getUserByEmail(email);

  if (!user || !bcrypt.compare(password, user.password)) {
    throw new Error('INVALID_EMAIL_OR_PASSWORD');
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const getUserById = async (id) => {
  return userDao.getUserById(id);
};

module.exports = {
  signUp,
  login,
  getUserById,
};
