const dataSource = require('./Dao');

const like = async (userId, postId) => {
    try {
        console.log(`333333333:::::userId = ${userId}, postId = ${postId}`);
        return await dataSource.query(`
            INSERT INTO likes(
                user_id,
                post_id
            ) VALUES (?, ?);
        `, [userId, postId])
    } catch (err) {
        console.log(err);
        const error = new Error("DATA_NOT_FOUND333");
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {like};