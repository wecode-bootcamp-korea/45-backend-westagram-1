const bcrypt = require("bcrypt");

const password = 'password';
const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
    return await bcrypt.hash(password, saltRounds);
}

const checkHash = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

const validateToken = async (req, res, next) => {
    try {
        const hashedPassword = await makeHash(password, saltRounds);
        const result = await checkHash(password, hashedPassword);
        if (result) {
            const token = req.headers.authorization;
            next();
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (error) {
        res.status(500).send("Server Error");
    }
};

module.exports = validateToken;