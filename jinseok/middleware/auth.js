const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decoded = jwt.verify(JSON.parse(token), jwtSecret);

    req.user = decoded.id;

    next(); // (3)
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateToken,
};
