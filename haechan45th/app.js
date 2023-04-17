require('dotenv').config();

const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const { DataSource } = require('typeorm');
const port = 8000;

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
})

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/ping', function(req, res, next){
    res.status(200).json({message: 'pong'})
});

app.post('/users/signup', async function (req, res, next){
    const {email, password, name, age, phoneNumber} = req.body

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
    `,[email, password, name, age, phoneNumber])

    res.status(201).json({message:"userCreated"})
});

app.listen(port, function(){
    console.log(`server listening on port ${port}`)
});
