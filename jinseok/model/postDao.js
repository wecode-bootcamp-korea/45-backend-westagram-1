const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error occurred during Data Source initialization', err);
    dataSource.destroy();
  });

const createPost = async (context, userId) => {
  try {
    return await dataSource.query(
      `
        INSERT INTO posts (
          context, user_id 
        ) VALUES (
          ?, ?
        )
      `,
      [context, userId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    return await dataSource.query(
      `SELECT 
            users.id as userId, 
            users.name, 
            posts.id as postId, 
            posts.context 
        FROM posts
        INNER JOIN users ON users.id = posts.user_id `
    );
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

const getSpecificPost = async (userId) => {
  try {
    return await dataSource.query(
      `
            SELECT 
              users.id,
              users.profile_image,
              (
                SELECT
                  JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "postingId", posts.id,
                        "postingContent", posts.context
                    )
                  )
                FROM posts
                WHERE posts.user_id = ?
              ) AS postings
            FROM users
            WHERE users.id = ?
            `,
      [userId, userId]
    );
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

const updatePost = async (update, userId, postId) => {
  try {
    return await dataSource.query(
      `
      UPDATE posts SET context= ?
      WHERE user_id= ? AND id= ?;
      `,
      [update, userId, postId]
    );
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

const deletePost = async (userId, postId) => {
  try {
    return await dataSource.query(
      `
          DELETE FROM posts 
          WHERE posts.user_id= ? AND posts.id = ?
          `,
      [userId, postId]
    );
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSpecificPost,
  updatePost,
  deletePost,
};
