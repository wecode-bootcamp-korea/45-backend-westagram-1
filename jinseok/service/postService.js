const postDao = require('../model/postDao');

const createPost = (context, userId) => {
  return postDao.createPost(context, userId);
};

const getAllPosts = () => {
  return postDao.getAllPosts();
};

const getSpecificPost = (userId) => {
  return postDao.getSpecificPost(userId);
};

const updatePost = (update, userId, postId) => {
  return postDao.updatePost(update, userId, postId);
};

const deletePost = (userId, postId) => {
  return postDao.deletePost(userId, postId);
};

module.exports = {
  createPost,
  getAllPosts,
  getSpecificPost,
  updatePost,
  deletePost,
};
