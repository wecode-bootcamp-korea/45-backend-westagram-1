const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const {name, email, password, profileImg} = req.body;
        // console.log(name, email, password, profileImg);

        if ( !name || !email || !password ) {
            return res.status(400).json({ message: "Key_Error"});
        }

        await userService.signUp(name, email, password, profileImg);
        return res.status(201).json({ message: 'SIGNUP_SUCCESS'});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    }
}

module.exports = {signUp};