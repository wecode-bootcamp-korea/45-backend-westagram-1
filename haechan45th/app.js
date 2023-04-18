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

// Creating Users Posts
app.post("/users/posts", async function (req, res, next) {
  const { userEmail, title, content, imageUrl } = req.body;

  const [user] = await dataSource.query(
    `
        SELECT id FROM users WHERE email = ?
    `,
    [userEmail]
  );

  if (user) {
    const user_id = user.id;

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
      [user_id, title, content, imageUrl]
    );

    res.status(201).json({ message: "🎉 post has Created!!! 🎉 " });
  } else {
    console.log("User not found");
    res.status(404).json({ message: "User not found" });
  }
});


// Getting Users Posts (ALL)
app.get('/posts', async(req, res) => {
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

// Getting Specified User's Posts
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

// Editing User's Posts API
app.put('/posts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.body;
    const { title, content, imageUrl,} = req.body;

    const updatePosts = await dataSource.query(
      `UPDATE posts
      INNER JOIN users ON posts.user_id = users.id
      SET
      posts.title = ?,
      posts.content = ?,
      posts.image_url = ?
      WHERE users.id = ? AND posts.id = ?
      `, [ title, content, imageUrl, userId, postId]
    )

    res.status(200).json({ message: 'Post updated successfully.' });
  } catch(error){
    console.log(error);
    res.status(400).json({message: "Error has occur in USER EDITING API"})
  }
});

// Deleting User's Posts API
app.delete('/posts/:postsId', async (req, res) =>{
  try {
    const { postsId } = req.params;

    const deletePosts = await dataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ${postsId}
      `
    )

    res.status(200).json({ message: 'Post DELETED successfully.' });
  } catch(error) {
    console.log(error);
    res.status(400).json({message: "Error has occur in DELETING USER POSTS"})
  }
});

// Likes API
app.post('/users/likes', async(req, res) => {
  try { 
    const { user_id, postId } = req.body;

    const likePosts = await dataSource.query(
      `INSERT INTO likes(
        user_id,
        post_id
        ) VALUES (
          ?,
          ?
        )
    `,
  [user_id, postId]
    )
    
    res.status(200).json({ message: 'Post LIKED ❤️ successfully.' });
  } catch(error) {
    console.log(error);
    res.status(400).json({message: "Error has occur in LIKE USER POSTS"})
  }
});

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
