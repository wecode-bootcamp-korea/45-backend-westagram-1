const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error getting All Users /userController" });
    }
}

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'KEY_ERROR' });
        }

        await userService.signUp(name, email, password);

        return res.status(201).json({
            message: 'SIGNUP_SUCCESS'
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
};


module.exports = {
    signUp, getAllUsers
}
