const express = require('express');
const likeController = require('../controller/likeController');

const router = express.Router();

router.post('/', likeController.createLike);
//router.delete('/', likeController.deleteLike);

module.exports = {
  router,
};
