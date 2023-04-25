const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

const bcrypt = require("bcrypt");

const password = "password";
const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const checkHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const main = async () => {
  const hashedPassword = await makeHash(password, 12);
  const result = await checkHash(password, hashedPassword);
  console.log(result);
};

main();

app.get("/ping", (req, res) => {
  res.json({ message: "pong!" });
});

const server = http.createServer(app);
const port = process.env.PORT;

const start = async () => {
  try {
    server.listen(port, () => console.log(`Server is listening on ${port}`));
  } catch (err) {
    console.log(err);
  }
};

const person = {
  name: "Door",
  age: 1000000000,
};

start();
