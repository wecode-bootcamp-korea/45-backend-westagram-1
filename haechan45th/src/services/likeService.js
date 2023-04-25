const likeDao = require('../models/likeDao')

const likePosts = async (userId, postId) => {
    try {
        const existingLike = await likeDao.findLike(userId, postId);

        if (existingLike) {
            await likeDao.unlikePost(userId, postId);

            return "Post unliked successfully";
        } else {
            await likeDao.likePosts(userId, postId);
            return "Post liked successfully";
        }
    } catch (err) {
        console.error(err);
        throw new Error("Error occurred while liking/unliking post");
    }
};


module.exports = {
    likePosts
}