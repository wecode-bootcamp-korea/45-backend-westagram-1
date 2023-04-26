const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userDao = require('../models/userDao')

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

const getUserId = async (userId) => {
    try {
        const users = await userDao.getUserId(userId);
        return users;
    } catch (err) {
        console.log(err);
        throw new Error("Error in getting All Users /userService");
    }
}

const signUp = async (name, email, password, profileImage) => {
    try {
        await emailValidationCheck(email);
        await pwValidationCheck(password);

        const saltRounds = 12;

        const hashedPassword = await (async () => {
            return await bcrypt.hash(password, saltRounds);
        })();

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
            throw new Error('INVALID_EMAIL_OR_PASSWORD');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        return token

    } catch (err) {
        console.log(err);
        throw new Error('signIn Failed /userService');
    }
}

module.exports = {
    signUp, getAllUsers, signIn, getUserId
}