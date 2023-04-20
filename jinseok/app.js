require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const app = express();

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

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', function (req, res, next) {
  res.status(200).json({ message: 'pong' });
});

app.post('/users/signup', async function (req, res, next) {
  const { email, profileImage, password, name, age, phoneNumber } = req.body;

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
  const data = await dataSource.query(
    `SELECT post_id, context, user_id FROM posts`
  );
  res.status(200).json(data);
});

app.get('/users/:userId/posts', async function (req, res, next) {
  const userId = req.params.userId;
  const data = await dataSource.query(
    `
    SELECT 
      users.id,
      users.profile_image,
      (
        SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
                "postingId", posts.post_id,
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

  res.status(200).json(data);
});

app.put('/posts/:userid/:postid', async function (req, res, next) {
  const userId = req.params.userid;
  const postId = req.params.postid;
  await dataSource.query(
    `
  UPDATE posts SET context="this text is updated!", updated_at=CURRENT_TIMESTAMP
  WHERE user_id= ? AND post_id= ?;
  `,
    [userId, postId]
  );

  res.status(200).json({ message: 'post updated' });
});

app.delete('/posts/:postid', async function (req, res, next) {
  const id = req.params.postid;
  await dataSource.query(
    `
  DELETE FROM posts 
  WHERE post_id= ?
  `,
    [id]
  );
  res.status(200).json({ message: 'post deleted' });
});

app.post('/likes', async function (req, res, next) {
  const { userId, postsId } = req.body;
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
  res.status(201).json({ message: 'likeCreated' });
});

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
