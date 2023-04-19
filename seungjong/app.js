require('dotenv').config();
const cors = require("cors");
const logger = require("morgan");
const express = require('express');
const { DataSource } = require("typeorm");
const app = express();
const port = 4000;

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
    res.status(200).json({message: "Hello World!!"});
})

app.get('/ping', (req, res, next) => {
    res.status(200).json({message: "pong!!"});
});

app.post('/signUp', async (req, res, next) => {
    const {name, email, password, profile_image } = req.body;

    await dataSource.query(
        `INSERT INTO users(
            name,
            email,
            password,
            profile_image
        ) VALUES (?, ?, ?, ?);
        `,
        [name, email, password, profile_image]
    );
    res.status(200).json({ message: "sucessfully created!" });
})

// addPost

app.post('/post', async(req, res, next) => {
    const {title, content, user_id} = req.body;

    await dataSource.query(
        `INSERT INTO posts(
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [title, content, user_id]
    );
    res.status(201).json({ message: "postCreated!" });
});



app.listen(port, () => {
    console.log(`Sever listiening on ${port}`);
});