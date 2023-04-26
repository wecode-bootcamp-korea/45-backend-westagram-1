const express = require("express");
const postController = require("../controllers/postController");
const router = express.Router();

router.post("/post", postController.addPost);
router.get("/", postController.posts);
router.get("/:userId/posts", postController.userPosts);
router.patch("/:userId/posts/:postId", postController.postUpdate);
router.delete("/:userId/posts/:postId", postController.postDelete);

module.exports = { router };
