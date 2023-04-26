const jwt = require("jsonwebtoken");
const userService = require("../services/userService")

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);

        const user = await userService.getUserId(decoded.id)
        console.log(user);

        if (!user) {
            const error = new Error('USER_DOES_NOT_EXIST')
            error.statusCode = 404

            return res.status(error.statusCode).json({ message: error.message })
        }
        req.user = user;

        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid Token");
    }
};

module.exports = {
    validateToken
};
