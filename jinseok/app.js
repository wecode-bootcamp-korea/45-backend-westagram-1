require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.get('/ping', function (req, res, next) {
  res.status(200).json({ message: 'pong' });
});

const port = process.env.PORT;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (err) {
    console.error(err);
  }
};

start();
