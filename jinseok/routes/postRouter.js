const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/users/:userId', postController.getSpecificPost);
router.put('/', postController.updatePost);
router.delete('/:postId/users/:userId', postController.deletePost);

module.exports = {
  router,
};
