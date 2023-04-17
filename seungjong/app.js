require('dotenv').config();

const cors = require('cors');
const logger = require('morgan');
const express = require('express');
const { DataSource } = require('typeorm');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());


// const dataSource = new DataSource({
//     type: process.env.DB_CONNECTION,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     logging : process.env.DB_LOGGING === "TRUE",
// })

// dataSource.initialize()
// .then(() => {
//     console.log("Data Source has been initialized!");
// })

// app.get('/', (req, res, next) => {
//     res.status(200).json({message: "Hello World!!"});
// })

// /ping으로 들가면 pong함
app.get('/ping', (req, res, next) => {
    console.log('aaaa')
    res.status(200).json({message: "pong!!"});
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

