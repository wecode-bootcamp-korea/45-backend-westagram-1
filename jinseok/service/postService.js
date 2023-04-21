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

module.exports = {
  createPost,
  getAllPosts,
  getSpecificPost,
};
