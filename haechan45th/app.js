require("dotenv").config();

const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const { DataSource } = require('typeorm');


const app = express();

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
})

dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  }).catch((err) => {
    console.log('DataSource Not Initialize :', err)
  })

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

//Health Check
app.get('/ping', function (req, res, next) {
  res.status(200).json({ message: 'pong' })
});

app.post('/users/signup', async function (req, res, next) {
  const { email, password, name, age, phoneNumber } = req.body

  await dataSource.query(`INSERT INTO users(
      email,
      password,
      name,
      age,
      phone_number
      ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
      )
  `, [email, password, name, age, phoneNumber])

  res.status(201).json({ message: "userCreated" })
});

app.post('/users/signup', async function (req, res, next) {
  const { email, password, name, age, phoneNumber } = req.body

  await dataSource.query(`INSERT INTO users(
      email,
      password,
      name,
      age,
      phone_number
      ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?
      )
  `, [email, password, name, age, phoneNumber])

  res.status(201).json({ message: "userCreated" })
});

app.post("/users/posts", async function (req, res, next) {
  const { userEmail, title, content, imageUrl } = req.body;

  const [user] = await dataSource.query(
    `
        SELECT id FROM users WHERE email = ?
    `,
    [userEmail]
  );

  if (!user) {
    console.log("User not found");
    res.status(404).json({ message: "User not found" });
  }

  await dataSource.query(
    `INSERT INTO posts(
          user_id,
          title,
          content,
          image_url
          ) VALUES (
            ?,
            ?,
            ?,
            ?
          )
      `,
    [user.id, title, content, imageUrl]
  );

  res.status(201).json({ message: "🎉 post has Created!!! 🎉 " });

});

app.get('/posts', async function (req, res) {
  const rows = await dataSource.query(`
    SELECT 
      users.id,
      users.name AS Author,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'title', posts.title,
          'content', posts.content,
          'image_url', posts.image_url,
          'created_at', posts.created_at
        )
      ) AS posts
    FROM posts 
    INNER JOIN users ON users.id = posts.user_id
    GROUP BY users.id;
  `);
  res.status(200).json(rows);
});

app.get('/users/:userId/posts', async (req, res) => {
  try {
    const { userId } = req.params;

    const gettingUserPosts = await dataSource.query(
      `SELECT 
      users.id,
      users.name AS Author,
      posts.title,
      posts.content,
      posts.image_url,
      posts.created_at
      FROM posts 
      INNER JOIN users ON users.id = posts.user_id
      WHERE users.id = ?
      `, [userId])

    return res.status(200).json({ gettingUserPosts })
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "some error" })
  }
});

app.put('/posts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.body;
    const { title, content, imageUrl, } = req.body;

    const updatePosts = await dataSource.query(
      `UPDATE posts
      INNER JOIN users ON posts.user_id = users.id
      SET
      posts.title = ?,
      posts.content = ?,
      posts.image_url = ?
      WHERE users.id = ? AND posts.id = ?
      `, [title, content, imageUrl, userId, postId]
    )

    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error has occur in USER EDITING API" })
  }
});

app.delete('/posts/:postsId', async (req, res) => {
  try {
    const { postsId } = req.params;
    const { userId } = req.params;

    const deletePosts = await dataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ? AND posts.user_id = ?
      `, [postsId, userId]
    )

    res.status(200).json({ message: 'Post DELETED successfully.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error has occur in DELETING USER POSTS" })
  }
});

app.post('/users/likes', async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const [existingLike] = await dataSource.query(
      `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`,
      [userId, postId]
    );

    if (existingLike) {
      await dataSource.query(
        `DELETE FROM likes WHERE user_id = ? AND post_id = ?`,
        [userId, postId]
      );
      res.status(200).json({ message: 'Post UNLIKED successfully.' });
    } else {
      await dataSource.query(
        `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`,
        [userId, postId]
      );
      res.status(200).json({ message: 'Post LIKED ❤️ successfully.' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error has occurred while liking/unliking the post." })
  }
});

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`server listening on port ${port} `);
});