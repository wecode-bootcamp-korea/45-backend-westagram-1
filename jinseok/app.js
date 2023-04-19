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
  const { text, userId } = req.body;

  await dataSource.query(
    `
    INSERT INTO posts (
      text, user_id
    ) VALUES (
      ?, ?
    )
    `,
    [text, userId]
  );
  res.status(201).json({ message: 'postCreated' });
});

app.get('/posts', async function (req, res, next) {
  const posts = await dataSource.query(
    `SELECT post_id, text, user_id FROM posts`
  );
  res.status(200).json(posts);
});

app.get('/posts/:id', async function (req, res, next) {
  const userId = req.params.id;
  const posts = await dataSource.query(`
  SELECT post_id, text, user_id FROM posts
  WHERE user_id = ${userId}
  `);

  res.status(200).json(posts);
});

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
