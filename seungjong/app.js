// require('dotenv').config();
// const cors = require("cors");
// const logger = require("morgan");
// const express = require('express');
// const { DataSource } = require("typeorm");
// const app = express();
// const port = process.env.PORT;

// app.use(cors());
// app.use(logger("combined"));
// app.use(express.json());

// const dataSource = new DataSource({
//     type: process.env.DB_CONNECTION,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     logging: process.env.DB_LOGGING
// })

// dataSource.initialize()
//     .then(() => {
//         console.log("Data Source has benn initializd!")
//     })
//     .catch(() => {
//         console.log("Fail!!")
//     })

// app.get('/', (req, res, next) => {
//     res.status(200).json({ message: "Hello World!!" });
// })

// app.get('/ping', (req, res, next) => {
//     res.status(200).json({ message: "pong!!" });
// });

// app.post('/signUp', async (req, res, next) => {
//     const { name, email, password, profileImg } = req.body;

//     await dataSource.query(
//         `INSERT INTO users(
//             name,
//             email,
//             password,
//             profile_image
//         ) VALUES (?, ?, ?, ?);
//         `,
//         [name, email, password, profileImg]
//     );
//     res.status(200).json({ message: "sucessfully created!" });
// })

// app.post('/addPost', async (req, res, next) => {
//     const { title, content, userId } = req.body;

//     await dataSource.query(
//         `INSERT INTO posts (
//             title,
//             content,
//             user_id)
//             VALUES (?, ?, ?);
//             `, [title, content, userId]
//     );
//     res.status(201).json({ message: "postCreated!" });
// });

// app.get('/posts', async (req, res, next) => {
//     const { userId, userProfileImage, postingId, postinImageUrl, postingContent } = req.body;

//     const posts = await dataSource.query(`
//         SELECT
//         u.id,
//         u.profile_image,
//         p.user_id,
//         p.image_url,
//         p.content
//         FROM
//         users as u
//         INNER JOIN posts as p
//         ON u.id = p.user_id
//         ;
//         `);
//         res.status(200).json({data: posts});  
// })

// app.get('/users/:userId/posts', async (req, res, next) => {
//     const { userId } = req.params;
//     const posts = await dataSource.query(
//         `SELECT
//             users.id as userId,
//             users.profile_image as userProfileImage,
//             (
//                 SELECT
//                 JSON_ARRAYAGG(
//                     JSON_OBJECT(
//                         "postingId", posts.id,
//                         "postingImageUrl", posts.image_url,
//                         "postingContent", posts.content
//                     )
//                 )
//                 FROM posts
//                 JOIN users ON users.id = posts.user_id
//                 WHERE posts.user_id = ?
//             ) as postings
//             FROM users
//             WHERE users.id = ?;`, [userId, userId]
//     )
//     res.status(200).json({message: "성공", data: posts});

// });


// app.patch('/users/:userId/:postId', async (req, res, next) => {
//     const { userId, postId } = req.params;
//     const { userName, title, content } = req.body;

//     await dataSource.query(`    
//         UPDATE posts
//         SET
//         content = ?
//         WHERE id = ?     
//         `, [content, postId]
//         )
    
//     const result = await dataSource.query(`
//         SELECT
//         u.id,
//         u.name,
//         p.id,
//         p.title,
//         p.content
//         FROM users as u
//         JOIN posts as p
//         ON u.id = p.user_id
//         WHERE p.id = ?;
//     `, [postId]);

//     res.status(200).json({ data: {
//         userId : userId,
//         userName: result[0].name,
//         postingId : postId,
//         postingTitle: result[0].title,
//         postingContent: content
//     } });
// })


// app.delete('/users/:userId/:postId/postDelete', async(req, res, next) => {
//     const {userId, postId} = req.params;
//     await dataSource.query(`
//         DELETE FROM posts as p
//         WHERE p.id = ?
//         AND p.user_id = ?;
//     `, [postId, userId]);
//     res.status(200).json({message: "postingDeleted"});
// });


// app.post('/likes/:userId/:postId', async(req, res, next) => {
//     const {userId, postId} = req.params;

//     const [result] = await dataSource.query(`
//         SELECT EXISTS(
//             SELECT
//             id
//             FROM likes
//             WHERE user_id = ? AND post_id = ?
//         ) AS isLiked;
//     `, [userId, postId]);

//     if(!!parseInt(result.isLiked)) {
//         // console.log(result.isLiked)
//         await dataSource.query(`
//         DELETE FROM likes
//         WHERE user_id = ? AND post_id = ?;
//         `, [userId, postId]);
//         res.status(200).json({message: "deleteLiked!"});
//     } else {
//         await dataSource.query(`
//             INSERT INTO likes(
//                 user_id,
//                 post_id
//             ) VALUES (?, ?);
//         `, [userId, postId]);
//         res.status(200).json({message: "likeCreated!"});
//     }

// })

// app.listen(port, () => {
//     console.log(`Sever listiening on ${port}`);
// });

// // =====================================================================
// // Layered Patteren
const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv =require("dotenv")
dotenv.config();
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);


app.get('/ping', (req, res) => {
    res.json({ message: "pong!" });
})

const server = http.createServer(app);
const port = process.env.PORT;

const start = async () => {
    try {
        server.listen(port, () => console.log(`Server is listening on ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();