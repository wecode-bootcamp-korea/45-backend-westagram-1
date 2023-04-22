const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/addPost', postController.addPost);
router.get('/', postController.posts);
router.get('/:userId/posts', postController.userPosts);
router.patch('/:userId/posts/:postId/postUpdate', postController.postUpdate);
module.exports = {router}