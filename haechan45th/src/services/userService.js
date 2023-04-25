const userDao = require('../models/userDao')
const bcrypt = require("bcrypt");
const saltRounds = 12;
const config = process.env;
const jwt = require('jsonwebtoken');
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

const signIn = async (email, password) => {
    try {
        const user = await userDao.getUserByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new Error('KEY_ERROR');
        }
        const token = jwt.sign({ email: user.email }, config.JWT_SECRET_KEY, { expiresIn: "1h" });
        return {
            token,
            user
        };
    } catch (err) {
        console.log(err);
        throw new Error('signIn Failed /userService');
    }
}

module.exports = {
    signUp, getAllUsers, signIn
}