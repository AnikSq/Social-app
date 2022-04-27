const router = require("express").Router();
const userController = require("./../controllers/userController");

// // Get all users

// router.get("/", userController.getAllUsers);

// update user
router.patch("/:id", userController.updateMe);
// delete user

router.delete("/:id", userController.delete);

// get a user

router.get("/", userController.getUser);

// follow user

router.patch("/:id/follow", userController.followUser);

// unfollow user

router.patch("/:id/unfollow", userController.unfollowUser);

// get friends

router.get("/friends/:userId", userController.getAllFriends);

// update user
// update user
// update user

module.exports = router;
