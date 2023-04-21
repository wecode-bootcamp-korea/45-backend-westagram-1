const userService = require('../service/userService');

const signUp = async (req, res) => {
  try {
    const { email, profileImage, password, name, age, phoneNumber } = req.body;

    if (!email || !profileImage || !password || !name || !age || !phoneNumber) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp(
      email,
      profileImage,
      password,
      name,
      age,
      phoneNumber
    );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
};
