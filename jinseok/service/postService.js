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

module.exports = {
  createPost,
  getAllPosts,
  getSpecificPost,
  updatePost,
};

/*app.put('/posts', async function (req, res, next) {
  const { update, userId, postId } = req.body;

  await dataSource.query(
    `
  UPDATE posts SET context= ?
  WHERE user_id= ? AND id= ?;
  `,
    [update, userId, postId]
  );

  res.status(200).json({ message: 'post updated' });
});*/
