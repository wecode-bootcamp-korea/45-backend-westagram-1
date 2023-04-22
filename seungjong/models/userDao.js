const dataSource = require("./Dao");

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