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

const createLike = async (userId, postId) => {
  try {
    return await dataSource.query(
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

module.exports = {
  createLike,
};
