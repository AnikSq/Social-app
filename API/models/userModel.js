const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "A User must have a username"],
      min: 3,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      required: [true, "You must provide an email"],
      max: 50,
      unique: [true, "You might already have an account with us"],
      validate: [validator.isEmail, "please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Your account must have an password"],
      minLength: [8, "You password must at least be eight character long"],
      select: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    // We are using an array, cause it isn't a commercial product
    // But if it is gonna be commercial then we should seriously use parent referencing
    // Since, Someone like a celebrity can have millions of followers
    // Then, The Array is gonna tank pretty badly

    followers: {
      type: Array,
      default: [],
    },

    //Following can be a little forgiving, it might be okay to use a array
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      select: false,
    },
    description: {
      type: String,
      max: 200,
    },
    city: {
      type: String,
      max: 50,
    },
    from: {
      type: String,
      max: 50,
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
); // This will create a timestamp whenever a user is created

module.exports = mongoose.model("User", UserSchema);
