const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.get('/ping', function (req, res, next) {
  res.status(200).json({ message: 'pong' });
});

const port = process.env.PORT;

app.listen(port, function () {
  console.log('server listening on port 3000');
});
