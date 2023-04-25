const userDao = require('../models/userDao')
const { emailValidationCheck, pwValidationCheck } = require('../utils/validation-check')

const getAllUsers = async () => {
    try {
        const users = await userDao.getAllUsers();
        return users;
    } catch (err) {
        console.log(err);
        throw new Error("Error occured in getting All Users /userService");
    }
}

const signUp = async (name, email, password, profileImage) => {
    try {
        emailValidationCheck(email);
        pwValidationCheck(password);

        const createUser = await userDao.createUser(name, email, password, profileImage);

        return createUser;
    } catch (err) {
        console.log(err);
        throw new Error('Error occurred in sign-up /userService');
    }
};


module.exports = {
    signUp, getAllUsers
}