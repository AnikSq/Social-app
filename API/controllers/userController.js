const User = require("../models/userModel");
const AppError = require("./../utitls/AppError");
const bcrypt = require("bcrypt");
const catchAsync = require("./../utitls/catchAsync");

// Curcular array is always when you forget to do await

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find();

  res.status(200).json(allUsers);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const urlId = req.params.id;
  const { userId, password, newPassword } = req.body;

  if (userId !== urlId)
    return next(new AppError("You cannot update info other than your own!"));

  const currentUser = await User.findById(userId);

  if (!currentUser) return next(new AppError("User not found", 404));

  if (password && newPassword) {
    const value = await bcrypt.compare(password, currentUser.password);

    if (!value) return next(new AppError("Incorrect Password", 401));

    if (newPassword.length < 8)
      return next(
        new AppError(
          "New Password length must at least be eight characters",
          401
        )
      );
    req.body.password = await bcrypt.hash(newPassword, 12);
  }

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedUser);
});

exports.delete = catchAsync(async (req, res, next) => {
  if (req.params.id !== req.body.userId)
    return next(new AppError("You can only delete your own profile!"));

  await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: "",
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.query.userId; // This is same as 127.0.0.1/users?userId=23314
  const username = req.query.username; // This is same as 127.0.0.1/users?username=Jonas
  // So we can have them both
  console.log(userId, username);

  const currentUser = userId // turnary
    ? await User.findById(userId)
    : await User.findOne({ username: username });

  const { createdAt, updatedAt, ...otherStuff } = currentUser._doc;

  res.status(200).json(otherStuff);
});

exports.followUser = catchAsync(async (req, res, next) => {
  if (req.body.userId === req.params.id)
    return next(new AppError("You cannot follow yourself!", 400));

  const currentUser = await User.findById(req.body.userId);
  const followingUser = await User.findById(req.params.id);

  if (followingUser.followers.includes(req.body.userId))
    return next(new AppError("You are already following this user!", 400));

  await followingUser.updateOne({ $push: { followers: req.body.userId } }); // Cross Refrencing
  await currentUser.updateOne({ $push: { following: req.params.id } });

  res.status(200).json({
    status: "success",
    message: "Followed",
  });
});

exports.unfollowUser = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.body.userId);
  const followingUser = await User.findById(req.params.id);

  await followingUser.updateOne({
    $pull: { followers: req.body.userId },
  }); // pulling this time
  await currentUser.updateOne({
    $pull: { following: req.params.id },
  });

  res.status(200).json({
    status: "success",
    message: "unfollowed",
  });
});

exports.getAllFriends = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user)
    return next(new AppError("The Following User does not exist", 404));

  const friends = await Promise.all(
    user.following.map((friendsId) => {
      return User.findById(friendsId);
    })
  );

  let friendList = [];
  friends.map((friend) => {
    const { _id, username, profilePicture } = friend;
    friendList.push({ _id, username, profilePicture });

    res.status(200).json(friendList);
  });
});
