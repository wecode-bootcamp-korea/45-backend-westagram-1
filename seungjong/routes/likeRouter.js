const express = require("express");
const router = express.Router();
const likeController = require('../controllers/likeController');

router.post('/users/:userId/posts/:postId', likeController.like );

module.exports = {router};