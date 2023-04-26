const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ message: "TOKEN_EMPTY" });

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).jsson({ message: "Token Error" });
  }
};
module.exports = { authorization };
