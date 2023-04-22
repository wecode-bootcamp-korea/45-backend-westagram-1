// services/postService.js

const postDao = require('../models/postDao');

const addPost = async (title, content, imgUrl, userId) => {
    const addPost = await postDao.addPost(
        title,
        content,
        imgUrl,
        userId
    );

    return addPost;
}

const posts = async () => {
    
    const posts = await postDao.posts();
    return posts;
}

const userPosts = async (userId) => {
    const userPosts = await postDao.userPosts(userId);
    return userPosts;
}

const postUpdate = async (postId, content) => {
    console.log("22222222",postId, content);
    const postUpdate = await postDao.postUpdate(postId, content);
    return postUpdate;
}

module.exports = {
    addPost,
    posts,
    userPosts,
    postUpdate
}