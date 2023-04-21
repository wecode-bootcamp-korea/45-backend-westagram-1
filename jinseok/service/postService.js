const postDao = require('../model/postDao');

const createPost = async (context, userId) => {
  return await postDao.createPost(context, userId);
};

module.exports = {
  createPost,
};
