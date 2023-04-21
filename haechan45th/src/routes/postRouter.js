const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/all', postController.getAllPost);
router.get('/:userId/all', postController.getSpecificUserPost);
router.post('/:userId/create', postController.createUserPost);
router.post('/:userId/:postId/edit', postController.editUserPosts);
router.delete('/:userId/:postId/delete', postController.deleteUserPosts);

module.exports = {
    router
}