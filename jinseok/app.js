require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const routes = require('./routes');

const app = express();

/*
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
  .catch((error) => console.log(error));
*/

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.get('/ping', function (req, res, next) {
  res.status(200).json({ message: 'pong' });
});

/*
app.post('/users/signup', async function (req, res, next) {
  const { email, profileImage, password, name, age, phoneNumber } = req.body;

  if (!name || !email || !password || !age || !phoneNumber) {
    return res.status(400).json({ message: 'KEY_ERROR' });
  }

  await dataSource.query(
    `
    INSERT INTO users (
      email, profile_image, password, name, age, phone_number 
    ) VALUES (
      ?, ?, ?, ?, ?, ?
    )
  `,
    [email, profileImage, password, name, age, phoneNumber]
  );

  res.status(201).json({ message: 'usercreated' });
});

app.post('/posts', async function (req, res, next) {
  const { context, userId } = req.body;

  await dataSource.query(
    `
    INSERT INTO posts (
      context, user_id
    ) VALUES (
      ?, ?
    )
    `,
    [context, userId]
  );
  res.status(201).json({ message: 'postCreated' });
});

app.get('/posts', async function (req, res, next) {
  const posts = await dataSource.query(
    `SELECT 
      users.id as userId, 
      users.name, 
      posts.id as postId, 
      posts.context 
    FROM posts
    INNER JOIN users ON users.id = posts.user_id `
  );
  res.status(200).json({ data: posts });
});

app.get('posts/users/:userId', async function (req, res, next) {
  const userId = req.params.userId;
  const post = await dataSource.query(
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

  res.status(200).json({ data: post });
});

app.put('/posts', async function (req, res, next) {
  const { update, userId, postId } = req.body;

  await dataSource.query(
    `
  UPDATE posts SET context= ?
  WHERE user_id= ? AND id= ?;
  `,
    [update, userId, postId]
  );

  res.status(200).json({ message: 'post updated' });
});

app.delete('/posts/:postid/users/:userid', async function (req, res, next) {
  const { userId, postId } = req.params;
  await dataSource.query(
    `
  DELETE FROM posts 
  WHERE posts.user_id= ? AND posts.id = ?
  `,
    [userId, postId]
  );
  res.status(200).json({ message: 'post deleted' });
});

app.post('/likes', async function (req, res, next) {
  const { userId, postsId } = req.body;

  const like = await dataSource.query(
    `SELECT user_id, posts_id 
    FROM likes 
    WHERE user_id = ? AND posts_id = ?`,
    [userId, postsId]
  );

  if (!(JSON.stringify(like) === '[]')) {
    await dataSource.query(
      `
    DELETE FROM likes 
    WHERE user_id= ? AND posts_id = ?
    `,
      [userId, postsId]
    );
    res.status(200).json({ message: 'like deleted' });
  } else {
    try {
      await dataSource.query(
        `
      INSERT INTO likes (
        user_id, posts_id
      ) VALUES (
        ?, ?
      )
    `,
        [userId, postsId]
      );
      res.status(201).json({ message: 'like created' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }
});
*/

const port = process.env.PORT;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (err) {
    console.error(err);
  }
};

start();
