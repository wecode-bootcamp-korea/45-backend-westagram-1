const express = require('express');
const postController = require('../controllers/postController');


const router = express.Router();

router.get('', postController.getAllPost);
router.get('/:userId', postController.getSpecificUserPost);
router.post('/:userId', postController.createUserPost);
router.post('/:userId/:postId', postController.editUserPosts);
router.delete('/:userId/:postId', postController.deleteUserPosts);

module.exports = {
    router
}