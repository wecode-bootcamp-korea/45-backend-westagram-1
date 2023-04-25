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
  pwValidationCheck(password);
  emailValidationCheck(email);

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

module.exports = {
  signUp,
};
