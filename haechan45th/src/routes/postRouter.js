const express = require('express');
const postController = require('../controllers/postController');
const { validateToken } = require('../middleware/auth');


const router = express.Router();

router.get('/all', postController.getAllPost);
router.get('', validateToken, postController.getSpecificUserPost);
router.post('', validateToken, postController.createUserPost);
router.post('/:postId', validateToken, postController.editUserPosts);
router.delete('/:postId', validateToken, postController.deleteUserPosts);

module.exports = {
    router
}