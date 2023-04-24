const postService = require('../services/postService');

const addPost = async (req, res) => {
    try {
        const { title, content, imgUrl, userId } = req.body;

        if (!title || !userId) {
            return res.status(400).json({ message: "Key_Error" });
        }
        await postService.addPost(title, content, imgUrl, userId);
        return res.status(201).json({ message: "ADDPOST_SUCCESS" });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const posts = async (req, res) => {
    try {
        const result = await postService.posts();
        return res.status(201).json({data: result});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const userPosts = async(req, res) => {
    try {
        const {userId} = req.params;
        if (!userId) {
            return res.status(400).json({message: "USER_NOT_FOUND"});
        }
        const result = await postService.userPosts(userId);
        return res.status(201).json({data: result});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const postUpdate = async(req, res) => {
    try {
        const {userId, postId} = req.params;
        const {content} = req.body;


        if (!userId || !postId) {
            return res.status(400).json({message: "USER_POST_NOT_FOUND"});
        }
        const result = await postService.postUpdate(postId, content)
        return res.status(201).json({data: result});
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}

const postDelete = async(req, res) => {
    try {
        const {userId, postId} = req.params;

        if(!userId || !postId) {
            return res.status(400).json({message: "USER_POST_NOT_FOUND"});
        }
        await postService.postDelete(userId, postId)
        return res.status(201).json({message: "POST_DELETE!"});

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    }
}



module.exports = {
    addPost,
    posts,
    userPosts,
    postUpdate,
    postDelete,
}