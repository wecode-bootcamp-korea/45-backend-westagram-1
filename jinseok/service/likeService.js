const likeDao = require('../model/likeDao');

const createLike = async (userId, postId) => {
  return await likeDao.createLike(userId, postId);
};

module.exports = {
  createLike,
};
