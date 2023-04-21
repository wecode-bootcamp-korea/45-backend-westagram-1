const { dataSource } = require("./dataSource")

const getUserId = async (userId) => {
    try {
        const [getUserId] = await dataSource.query(
            `SELECT * FROM users 
      WHERE users.id = ?`,
            [userId]
        )
        return getUserId;
    } catch (error) {
        console.log(error);
        throw new Error("Error has occurred with getUserID /userDAO");
    }
};


const createUser = async (name, email, password, profileImage) => {
    try {
        return await dataSource.query(
            `INSERT INTO users(
		    name,
		    email,
		    password,
		    profile_image
		) VALUES (?, ?, ?, ?);
		`,
            [name, email, password, profileImage]
        );
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};


module.exports = {
    createUser, getUserId
}