const likeService = require('../services/likeService');

const like = async (req, res) => {
    try {
        const {userId, postId} = req.params;
        console.log(`111111111:::userId::${userId},postId:::${postId}`);
        
        if( !userId || !postId) {
            return res.status(400).json({message: "NOT_FOUND" });
        }
        const result = await likeService.like(userId, postId);
        console.log(result.insertId);
        if (result.insertId === 0) {
            return res.status(200).json({message: "deleteLiked!"});
        } else {
            return res.status(200).json({message: "likeCreated!"});            
        }
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

module.exports = {
    like,
}