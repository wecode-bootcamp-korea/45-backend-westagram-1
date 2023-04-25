const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const dotenv =require("dotenv")
dotenv.config();
const routes = require("./routes");
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);


app.get('/ping', (req, res) => {
    res.json({ message: "pong!" });
})

const server = http.createServer(app);
const port = process.env.PORT;

const start = async () => {
    try {
        server.listen(port, () => console.log(`Server is listening on ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();