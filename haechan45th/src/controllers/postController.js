const postService = require('../services/postService');

const getAllPost = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error getting All posts /postController" });
    }
};

const getSpecificUserPost = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: 'USER_POSTS_NOT_FOUND' });
        }

        const posts = await postService.getSpecificUserPost(userId);

        return res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error getting Users posts /postController" });
    }
};

const createUserPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const { title, content, imageUrl } = req.body;

        if (!userId || !title || !content) {
            return res.status(400).json({ message: 'USER_POSTS_CANT_CREATED' });
        }

        await postService.createPosts(userId, title, content, imageUrl);

        return res.status(202).json({
            message: 'SUCCESSFULLY CREATED USER POST'
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
};

const editUserPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        const { title, content, imageUrl } = req.body;

        if (!userId || !postId || !title || !content) {
            return res.status(422).json({ message: 'USER_POSTS_CANT_UPDATED' });
        }
        const post = await postService.getPostById(postId);

        if (!post || post.user_id !== parseInt(userId)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await postService.editUserPosts(userId, postId, title, content, imageUrl);

        return res.status(202).json({
            message: 'SUCCESSFULLY UPDATED USER POST'
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
};


const deleteUserPosts = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId } = req.params;

        if (!postId || !userId) {
            return res.status(422).json({ message: 'USER_POSTS_CANT_DELETED' });
        }

        const post = await postService.getPostById(postId);

        if (!post || post.user_id !== parseInt(userId)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        await postService.deleteUserPosts(postId);

        return res.status(202).json({
            message: 'SUCCESSFULLY DELETED USER POST'
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        });
    }
};


module.exports = {
    getAllPost, getSpecificUserPost, createUserPost, editUserPosts, deleteUserPosts
}