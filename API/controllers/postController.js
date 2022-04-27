const Post = require("./../models/postModel");
const catchAsync = require("./../utitls/catchAsync");
const AppError = require("./../utitls/AppError");
const User = require("./../models/userModel");

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);
  res.status(201).json(newPost);
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post.userId === req.body.userId) {
    await post.updateOne(req.body);
  } else {
    next(
      new AppError("You cannot update a post that doesn't belong to you", 403)
    );
  }
  res.status(200).json({
    status: "success",
    message: "post have been updated",
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post.userId === req.body.userId) {
    await post.deleteOne();
  } else {
    next(
      new AppError("You cannot update a post that doesn't belong to you", 403)
    );
  }
  res.status(200).json({
    status: "success",
    message: "post have been deleted",
  });
});

exports.likePost = catchAsync(async (req, res, next) => {
  const currentPost = await Post.findById(req.params.id);
  if (currentPost.likes.includes(req.body.userId)) {
    await currentPost.updateOne({ $pull: { likes: req.body.userId } });
  } else {
    await currentPost.updateOne({ $push: { likes: req.body.userId } });
  }

  res.status(200).json({
    status: "success",
    message: "Post has been updated",
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  const currentPost = await Post.findById(req.params.id);

  if (!currentPost) return next(new AppError("The Post does not exist", 404));

  res.status(200).json(currentPost);
});

exports.getUserFeed = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.params.userId);

  const userPosts = await Post.find({ userId: currentUser._id });

  const friendPosts = await Promise.all(
    // it will return an array of solved promises
    currentUser.following.map((contactId) => {
      return Post.find({ userId: contactId }); // each promise
    })
  );

  const allPosts = userPosts.concat(...friendPosts);

  res.status(200).json(allPosts);
});

// Get all user posts

//
exports.getAllCurrentUserPosts = catchAsync(async (req, res, next) => {
  const currentUser = await User.findOne({ username: req.params.username });

  const allPostsofCurrentUser = await Post.find({ userId: currentUser._id });

  res.status(200).send(allPostsofCurrentUser);
});
