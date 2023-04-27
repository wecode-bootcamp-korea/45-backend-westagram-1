const likeDao = require("../models/likeDao");

const like = async (userId, postId) => {
  console.log(`222222222:::userId::${userId},postId:::${postId}`);
  const like = await likeDao.like(userId, postId);
  return like;
};

module.exports = { like };
