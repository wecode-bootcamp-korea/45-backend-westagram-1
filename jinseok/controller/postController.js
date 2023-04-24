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
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
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

const updatePost = async (req, res) => {
  try {
    const { update, userId, postId } = req.body;
    if (!update || !userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.updatePost(update, userId, postId);
    return res.status(201).json({ message: 'post updated' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    if (!userId || !postId) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }
    await postService.deletePost(userId, postId);
    return res.status(200).json({ message: 'post deleted' });
  } catch (err) {
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSpecificPost,
  updatePost,
  deletePost,
};
