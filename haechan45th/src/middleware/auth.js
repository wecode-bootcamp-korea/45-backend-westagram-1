const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).send("A token is required for authentication");
        }

        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;

        return next();
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid Token");
    }
};

module.exports = {
    validateToken
};
