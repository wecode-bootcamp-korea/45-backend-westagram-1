require("dotenv").config();

const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const { dataSource } = require('./src/models/dataSource');

const routes = require("./src/routes/index");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(routes);


//health check
app.get('/ping', function (req, res, next) {
  res.status(200).json({ message: 'pong' })
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    dataSource
      .initialize()
      .then(() => {
        console.log("DataSource has been initialized!");
      })
      .catch((err) => {
        console.log("DataSource Not Initialize :", err);
        dataSource.destroy();
      });

    app.listen(PORT, () => console.log(`🚨 server listening on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
}

start();