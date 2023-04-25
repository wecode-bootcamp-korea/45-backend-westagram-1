const userDao = require('../models/userDao')
const bcrypt = require("bcrypt");
const saltRounds = 12
const { emailValidationCheck, pwValidationCheck } = require('../utils/validation-check')

const getAllUsers = async () => {
    try {
        const users = await userDao.getAllUsers();
        return users;
    } catch (err) {
        console.log(err);
        throw new Error("Error in getting All Users /userService");
    }
}

const signUp = async (name, email, password, profileImage) => {
    try {
        emailValidationCheck(email);
        pwValidationCheck(password);

        const makeHash = async (password, saltRounds) => {
            return await bcrypt.hash(password, saltRounds);
        }

        const hashedPassword = await makeHash(password, saltRounds);

        const createUser = await userDao.createUser(name, email, hashedPassword, profileImage);

        return createUser;
    } catch (err) {
        console.log(err);
        throw new Error('Error occurred in sign-up /userService');
    }
};


module.exports = {
    signUp, getAllUsers
}