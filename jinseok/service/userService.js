const { getUserPassword } = require('../model/userDao');
const userDao = require('../model/userDao');
const {
  pwValidationCheck,
  emailValidationCheck,
} = require('../utils/validation-check.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (
  email,
  profileImage,
  password,
  name,
  age,
  phoneNumber
) => {
  pwValidationCheck(password);
  emailValidationCheck(email);

  const saltRounds = parseInt(process.env.SALT_ROUNDS);
  const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const hashedPassword = await makeHash(password, saltRounds);
  password = hashedPassword;

  const createUser = await userDao.createUser(
    email,
    profileImage,
    password,
    name,
    age,
    phoneNumber
  );

  return createUser;
};

const login = async (email, password) => {
  emailValidationCheck(email);

  // get user id and password
  const userObj = await userDao.getUser(email);
  const userId = userObj[0].id;
  const hashedPassword = userObj[0].password;

  // bycrypt verification
  const checkHash = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  // check if pw is valid
  const isPwValid = await checkHash(password, hashedPassword);
  console.log(isPwValid);

  // check if email is valid
  const isEmailValid = await userDao.isExistedUser(email);

  let validornot;
  if (isEmailValid && isPwValid) {
    try {
      //토큰 발급
      const jwtToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);

      validornot = { accessToken: jwtToken };
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
    return validornot;
  }
  try {
    validornot = 'Invlaid User';
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'error' });
  }

  return validornot;
};

module.exports = {
  signUp,
  login,
};
