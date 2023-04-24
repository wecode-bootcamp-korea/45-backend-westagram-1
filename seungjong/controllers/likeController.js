const likeService = require('../services/likeService');

const like = async (req, res) => {
    try {
        const {userId, postId} = req.params;

        if( !userId || !postId) {
            return res.status(400).json({message: "NOT_FOUND" });
        }
        await likeService.like(userId, postId);
        return res.status(201).json({message: "likeCreated!"});
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
    like,
}