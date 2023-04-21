const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/users/:userId', postController.getSpecificPost);

module.exports = {
  router,
};
