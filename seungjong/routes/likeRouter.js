const express = require("express");

const likeController = require("../controllers/likeController");

const router = express.Router();

router.post("/:userId/:postId", likeController.like);

module.exports = { router };
