const passwordValidationCheck = async (password) => {
  // password validation using REGEX
  console.log(password);
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  console.log(`11111`, pwValidation);
  return pwValidation;
};

module.exports = { passwordValidationCheck };
