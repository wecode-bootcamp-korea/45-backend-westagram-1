require('dotenv').config();
const cors = require("cors");
const logger = require("morgan");
const express = require('express');
const { DataSource } = require("typeorm");
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(logger("combined"));
app.use(express.json());

const dataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: process.env.DB_LOGGING
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has benn initializd!")
    })
    .catch(() => {
        console.log("Fail!!")
    })

app.get('/', (req, res, next) => {
    res.status(200).json({ message: "Hello World!!" });
})

app.get('/ping', (req, res, next) => {
    res.status(200).json({ message: "pong!!" });
});

app.post('/signUp', async (req, res, next) => {
    const { name, email, password, prfileImage } = req.body;

    await dataSource.query(
        `INSERT INTO users(
            name,
            email,
            password,
            profile_image
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, password, prfileImage]
    );
    res.status(200).json({ message: "sucessfully created!" });
})

// addPost

app.post('/addPost', async (req, res, next) => {
    const { title, content, userId } = req.body;

    await dataSource.query(
        `INSERT INTO posts (
            title,
            content,
            user_id)
            VALUES (?, ?, ?);
            `, [title, content, userId]
    );
    res.status(201).json({ message: "postCreated!" });
});

// posts 조회 API

app.get('/posts', async (req, res, next) => {
    const { userId, userProfileImage, postingId, postinImageUrl, postingContent } = req.body;

    await dataSource.query(`
        SELECT
        u.id,
        u.profile_image,
        p.user_id,
        p.image_url,
        p.content
        FROM
        users as u
        INNER JOIN posts as p
        ON u.id = p.user_id
        ;
        `
        , (err, rows) => {
            res.status(200).json(rows);
        })
})

// 특정 유저가 작성한 게시물 API
app.get('/users/:userId/posts', async (req, res, next) => {
    const { userId } = req.params;
    const posts = await dataSource.query(
        `SELECT
            users.id as userId,
            users.profile_image as userProfileImage,
            (
                SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "postingId", posts.id,
                        "postingImageUrl", posts.image_url,
                        "postingContent", posts.content
                    )
                )
                FROM posts
                JOIN users ON users.id = posts.user_id
                WHERE posts.user_id = ?
            ) as postings
            FROM users
            WHERE users.id = ?;`, [userId, userId]
    )
    res.status(200).json({message: "성공", userId, data: posts});

});



app.listen(port, () => {
    console.log(`Sever listiening on ${port}`);
});