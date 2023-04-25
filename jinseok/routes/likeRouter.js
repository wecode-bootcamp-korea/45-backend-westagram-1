const express = require('express');
const likeController = require('../controller/likeController');

const router = express.Router();

router.post('', likeController.createDeleteLike);

module.exports = {
  router,
};
