const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const mongoSanitize = require("express-mongo-sanitize");
const AppError = require("./utitls/AppError");
const globalErrorHandeller = require("./controllers/errorController");
const multer = require("multer");
const catchAsync = require("./utitls/catchAsync");
const path = require("path");

dotenv.config({ path: `${__dirname}/config.env` }); // This is to set where the env file is located

const DB = `${process.env.MONGO_URL}`;

mongoose.connect(DB, { useNewUrlParser: true }).then(() => {
  console.log("MongoDB server connected! ");
});

app.use("/images", express.static(path.join(__dirname, "public/images/")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

const storage = multer.diskStorage({
  // Now you know multer, YAY! (I don't know shit about this, If you need help, check documentaion)
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name); // this means we are gonna send the name inside our react application
  },
});

const upload = multer({ storage });
app.post(
  "/api/upload",
  upload.single("file"), // this is gonna upload our file automaticly
  catchAsync(async (req, res) => {
    return res.status(200).json("Successful");
  })
);

app.use(mongoSanitize());

// Routes Middlware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.all("*", (req, res, next) => {
  return next(
    new AppError(
      `The Requested url: ${req.originalUrl} was not found on the server`,
      404
    )
  );
});

app.use(globalErrorHandeller);

app.listen(8000, () => {
  console.log("Server running");
});
