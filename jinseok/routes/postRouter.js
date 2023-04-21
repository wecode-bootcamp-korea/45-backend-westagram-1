const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router.post('/', postController.createPost);

module.exports = {
  router,
};
