function pwValidationCheck(password) {
    const pwValidation = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;
    if (!pwValidation.test(password)) {
        const err = new Error('PASSWORD_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }
}

function emailValidationCheck(email) {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValidation.test(email)) {
        const err = new Error('EMAIL_IS_NOT_VALID');
        err.statusCode = 409;
        throw err;
    }
}

module.exports = {
    pwValidationCheck, emailValidationCheck
};