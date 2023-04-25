const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
};

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
    verifyToken,
    validateToken
};
