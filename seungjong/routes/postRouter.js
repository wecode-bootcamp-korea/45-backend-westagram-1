const express = require("express");
const postController = require("../controllers/postController");
const { authorization } = require("../utils/authorization");

const router = express.Router();

router.post("/post", authorization, postController.addPost);
router.get("/", postController.posts);
router.get("/:userId/posts", postController.userPosts);
router.patch("/:userId/posts/:postId", postController.postUpdate);
router.delete("/:userId/posts/:postId", postController.postDelete);

module.exports = { router };
