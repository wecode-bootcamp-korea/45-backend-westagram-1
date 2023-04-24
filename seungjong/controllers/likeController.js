const likeService = require('../services/likeService');

const like = async (req, res) => {
    try {
        const {userId, postId} = req.params;
        console.log(`111111111:::userId::${userId},postId:::${postId}`);

        if( !userId || !postId) {
            return res.status(400).json({message: "NOT_FOUND" });
        }
        const result = await likeService.like(userId, postId);
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
    like,
}