const postDao = require('../model/postDao');

const createPost = async (context, userId) => {
  return await postDao.createPost(context, userId);
};

const getAllPosts = async () => {
  return await postDao.getAllPosts();
};

module.exports = {
  createPost,
  getAllPosts,
};
