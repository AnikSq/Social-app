const router = require("express").Router();
const postController = require("./../controllers/postController");

// Create a post
router.post("/", postController.createPost);

// update a post

router.patch("/:id", postController.updatePost);

// delete a post
router.delete("/:id", postController.deletePost);

// like a post

router.patch("/:id/like", postController.likePost);

// get a post

router.get("/:id", postController.getPost);

// get all posts of the user
router.get("/timeline/:userId", postController.getUserFeed); // We added all here because the previous get a post would conflict with this now

router.get("/Profile/:username", postController.getAllCurrentUserPosts);

module.exports = router;
