const jwt = require('jsonwebtoken');

const userService = require('../service/userService');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    //check if token still exists
    if (!token) {
      const error = new Error('TOKEN_DOES_NOT_EXIST');
      error.statusCode = 409;
      throw error;
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    //check if user still exists
    const user = await userService.getUserById(decoded.id);
    if (!user) {
      const error = new Error('USER_DOES_NOT_EXIST');
      error.statusCode = 404;

      return res.status(error.statusCode).json({ message: error.message });
    }

    req.user = user.id;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateToken,
};
