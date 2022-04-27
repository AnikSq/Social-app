const User = require("../models/userModel");
const catchAsync = require("./../utitls/catchAsync");
const bcrypt = require("bcrypt");
const AppError = require("./../utitls/AppError");

exports.register = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  let saltedPassword = await bcrypt.hash(password, 12);

  const currentUser = await User.create({
    username,
    email,
    password: saltedPassword,
  });

  res.status(201).send(currentUser);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const currentUser = await User.findOne({ email }).select("+password");

  if (!currentUser)
    return next(new AppError("Username or password is invalid", 401));

  const passwordcrypt = await bcrypt.compare(password, currentUser.password);

  if (!passwordcrypt)
    return next(new AppError("Username or password is invalid", 401));

  res.status(200).send(currentUser);
});
