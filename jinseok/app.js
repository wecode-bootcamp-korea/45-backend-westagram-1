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
