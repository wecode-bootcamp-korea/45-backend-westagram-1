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

app.put('/posts/:userid/:postid', async function (req, res, next) {
  const userId = req.params.userid;
  const postId = req.params.postid;
  await dataSource.query(
    `
  UPDATE posts SET text="this text is updated"
  WHERE user_id=${userId} AND post_id=${postId}
  `
  );

  res.status(200).json({ message: 'post updated' });
});

app.delete('/posts/:id', async function (req, res, next) {
  const id = req.params.id;
  await dataSource.query(
    `
  DELETE FROM posts 
  WHERE post_id=${id}
  `
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
