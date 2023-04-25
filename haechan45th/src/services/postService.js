const postDao = require('../models/postDao')

const getAllPosts = async () => {
    try {
        const posts = await postDao.getAllPosts();
        return posts;
    } catch (err) {
        console.log(err);
        throw new Error("Error in getting all posts/PostService");
    }
};

const getPostById = async (postId) => {
    try {
        const getPostById = await postDao.getPostById(postId);
        return getPostById;
    } catch (err) {
        console.log(err);
        throw new Error("Error occurred in getting post by ID");
    }
};


const getSpecificUserPost = async (userId) => {
    try {
        const posts = await postDao.getSpecificUserPost(userId);
        return posts;
    } catch (err) {
        console.log(err);
        throw new Error("Error in getting user posts");
    }
};


const createPosts = async (userId, title, content, imageUrl) => {
    const postCreate = await postDao.createPosts(
        userId,
        title,
        content,
        imageUrl
    );

    return postCreate;
};

const editUserPosts = async (userId, postId, title, content, imageUrl) => {
    const editPosts = await postDao.editUserPosts(
        userId,
        postId,
        title,
        content,
        imageUrl,
    );

    return editPosts;
}

const deleteUserPosts = async (postId, userId) => {
    try {
        const result = await postDao.deleteUserPosts(postId, userId);
        return result;
    } catch (error) {
        console.log(error);
        throw new Error("Error occurred in deleting user posts /postService");
    }
};

module.exports = {
    getPostById,
    getAllPosts,
    getSpecificUserPost,
    createPosts,
    editUserPosts,
    deleteUserPosts,
    getPostById
}