const { dataSource } = require("./dataSource")

const getAllUsers = async () => {
    try {
        const rows = await dataSource.query(
            `SELECT
                users.id,
                users.name,
                users.email,
                users.password,
                users.profile_image,
                users.created_at
            FROM users
            `
        );
        return rows;
    } catch (err) {
        console.log(err);
        throw new Error("Error in getting getAllUsers / userDAO")
    }
}

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

const getUserByEmail = async (email) => {
    try {
        const [getUserByEmail] = await dataSource.query(
            `SELECT * FROM users 
            WHERE users.email = ?`,
            [email]
        )
        return getUserByEmail;
    } catch (err) {
        console.log(err);
        throw new Error('Error occurred in getUserByEmail /userDao');
    }
}


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

        return;
    } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
        throw error;
    }
};


module.exports = {
    createUser, getUserId, getAllUsers, getUserByEmail
}