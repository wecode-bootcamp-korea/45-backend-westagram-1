const postService = require('../service/postService');

const createPost = async (req, res) => {
  try {
    const { context, userId } = req.body;

    if (!context || !userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.createPost(context, userId);
    return res.status(201).json({
      message: 'POST_CREATED',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  return res.status(200).json({ posts });
};

const getSpecificPost = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    const post = await postService.getSpecificPost(userId);
    return res.status(200).json({ post });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getSpecificPost,
};
