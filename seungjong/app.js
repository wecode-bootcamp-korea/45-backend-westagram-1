require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const app = express();
const dataSource = require("./models/dataSource");

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initalized!");
  })
  .catch((err) => {
    console.log("Error occured during Data Source initializtion!", err);
    dataSource.destroy();
  });

app.get("/ping", (req, res) => {
  res.json({ message: "pong!" });
});

const port = process.env.PORT;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
