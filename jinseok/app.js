require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const app = express();

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

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', function (req, res, next) {
  res.status(200).json({ message: 'pong' });
});

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});
