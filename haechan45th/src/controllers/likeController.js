const likeService = require('../services/likeService');

const createLike = async (req, res) => {
    try {
        const { userId, postId } = req.body;

        if (!userId || !postId) {
            return res.status(400).json({ message: "Cannot Process the Like" });
        }

        const parsedUserId = parseInt(userId);
        const parsedPostId = parseInt(postId);

        await likeService.likePosts(parsedUserId, parsedPostId);

        return res.status(201).json({
            message: 'LIKE/UNLIKE_PROCESS_SUCCEED',
        });

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
};

module.exports = {
    createLike
}