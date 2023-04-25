const express = require('express');
const postController = require('../controllers/postController');

const validateToken = require("../middlewares/auth");

const router = express.Router();

router.get('', postController.getAllPost);
router.get('/:userId', validateToken, postController.getSpecificUserPost);
router.post('/:userId', validateToken, postController.createUserPost);
router.post('/:userId/:postId', validateToken, postController.editUserPosts);
router.delete('/:userId/:postId', validateToken, postController.deleteUserPosts);

module.exports = {
    router
}