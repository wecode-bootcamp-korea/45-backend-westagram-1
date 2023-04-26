const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/post', postController.addPost);
router.get('/', postController.posts);
router.get('/:userId/posts', postController.userPosts);
router.patch('/:userId/posts/:postId', postController.postUpdate);
router.delete('/:userId/posts/:postId', postController.postDelete);

module.exports = {router}