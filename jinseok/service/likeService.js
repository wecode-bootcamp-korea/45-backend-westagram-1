const likeDao = require('../model/likeDao');

const createDeleteLike = async (userId, postId) => {
  let createOrDelete;
  const isLiked = await likeDao.getLike(userId, postId);
  if (isLiked) {
    try {
      createOrDelete = 'Deleted Like';
      await likeDao.deleteLike(userId, postId);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
    return createOrDelete;
  }
  try {
    createOrDelete = 'Created Like';
    await likeDao.createLike(userId, postId);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'error' });
  }

  return createOrDelete;
};

module.exports = {
  createDeleteLike,
};
