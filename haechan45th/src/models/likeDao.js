const { dataSource } = require("./dataSource");
const { getUserId } = require("./userDao");
const { getPostById } = require("./postDao");

const findLike = async (userId, postId) => {
    try {
        const [likeRow] = await dataSource.query(
            `SELECT * FROM likes 
      WHERE user_id = ? AND post_id = ?`,
            [userId, postId]
        );
        return likeRow;

    } catch (err) {
        const error = new Error("Error occurred while finding like in likeDAO_findLike");
        error.statusCode = 400;
        throw error;
    }
};

const likePosts = async (userId, postId) => {
    try {
        await dataSource.query(
            `INSERT INTO likes(
            user_id,
            post_id
            ) VALUES (
              ?,
              ?
            )
        `,
            [userId, postId]
        );

        console.log("Post LIKED ❤️‍🔥 successfully.");
    } catch (err) {
        const error = new Error("Error occurred while liking post in likeDAO_likePosts")
        error.statusCode = 400;
        throw error;
    }
};

const unlikePost = async (userId, postId) => {
    try {
        await dataSource.query(
            `DELETE FROM likes WHERE user_id = ? AND post_id = ?`,
            [userId, postId]
        );

        console.log("Post UNLIKED 💔 successfully.");
    } catch (err) {
        const error = new Error(`Error occurred while unliking post in likeDAO_unlikePost: ${err.message}`);
        error.statusCode = 400;
        throw error;
    }
};

module.exports = {
    findLike, unlikePost, likePosts
};