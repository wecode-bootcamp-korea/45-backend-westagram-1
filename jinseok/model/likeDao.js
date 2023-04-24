const createLike = async (userId, postId) => {
  try {
    return dataSource.query(
      `
          INSERT INTO likes (
            user_id, posts_id
          ) VALUES (
            ?, ?
          )
        `,
      [userId, postId]
    );
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'error' });
  }
};

const getLike = async (userId, postId) => {
  try {
    return await dataSource.query(
      `
      SELECT user_id, posts_id 
        FROM likes 
        WHERE user_id = ? AND posts_id = ?`,
      [userId, postId]
    );
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'error' });
  }
};

const deleteLike = async (userId, postId) => {
  try {
    return await dataSource.query(
      `
      DELETE FROM likes 
        WHERE user_id= ? AND posts_id = ?
        `,
      [userId, postId]
    );
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'error' });
  }
};

module.exports = {
  createLike,
  getLike,
  deleteLike,
};
