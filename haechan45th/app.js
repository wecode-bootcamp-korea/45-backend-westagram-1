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
  console.log('DataSource Not Initialize :' , err)
})

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/ping', function(req, res, next){
    res.status(200).json({message: 'pong'})
});

const port = process.env.PORT;

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
  await dataSource.query(
    `SELECT 
      posts.id,
      users.name AS Author,
      posts.title,
      posts.content,
      posts.image_url,
      posts.created_at
      FROM posts 
      INNER JOIN users ON users.id = posts.user_id
      `, (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.get('/posts/:userId', async (req, res) => {
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

    return res.status(200).json({gettingUserPosts})
  } catch(error) {
    console.log(error)
    res.status(400).json({message: "some error"})
  }
});

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});