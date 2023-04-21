const userDao = require('../model/userDao');

const signUp = async (
  email,
  profileImage,
  password,
  name,
  age,
  phoneNumber
) => {
  // password validation using REGEX
  const pwValidation = new RegExp(
    '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
  );
  if (!pwValidation.test(password)) {
    const err = new Error('PASSWORD_IS_NOT_VALID');
    err.statusCode = 409;
    throw err;
  }
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
