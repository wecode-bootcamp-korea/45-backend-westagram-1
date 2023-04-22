// models/userDao.js

const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: process.env.DB_LOGGING
})

dataSource.initialize()
.then(() => {
    console.log("Data Soure has been initialized!");
})
.catch((err) => {
    console.log("Error occurred durung Data Source initialization!", err);
        dataSource.destroy();
});

const createUser = async ( name, email, password, profileImg ) => {
	try {
		return await dataSource.query(
		`INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
		[ name, email, password, profileImg ]
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
    createUser
}