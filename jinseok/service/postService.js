const postDao = require('../model/postDao');

const createPost = async (context, userId) => {
  return await postDao.createPost(context, userId);
};

const getAllPosts = async () => {
  return await postDao.getAllPosts();
};

const getSpecificPost = async (userId) => {
  return await postDao.getSpecificPost(userId);
};

const updatePost = async (update, userId, postId) => {
  return await postDao.updatePost(update, userId, postId);
};

const deletePost = async (userId, postId) => {
  return await postDao.deletePost(userId, postId);
};

module.exports = {
  createPost,
  getAllPosts,
  getSpecificPost,
  updatePost,
  deletePost,
};
