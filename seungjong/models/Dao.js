const {DataSource} = require("typeorm");

const dataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: process.env.DB_LOGGING
});

dataSource.initialize()
.then(() => {
    console.log("Data Source has been initalized!");
})
.catch((err) => {
    console.log("Error occured during Data Source initializtion!", err);
    dataSource.destroy();
});

module.exports = dataSource;