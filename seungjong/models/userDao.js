const dataSource = require("./dataSource");

const createUser = async (name, email, password, profileImg) => {
  try {
    return await dataSource.query(
      `INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
      [name, email, password, profileImg]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  console.log(`333333333`, email);
  try {
    return await dataSource.query(
      `SELECT
      id,
      password
      FROM users
      WHERE email = ?;
      `,
      [email]
    );
  } catch (err) {
    const error = new Error("DATA_NOT_FOUND");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
