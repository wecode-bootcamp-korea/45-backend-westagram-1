const likeService = require('../service/likeService');

const createDeleteLike = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const result = await likeService.createDeleteLike(userId, postId);
    return res.status(201).json({
      message: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createDeleteLike,
};
