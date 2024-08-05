const mongoose = require("mongoose");
const PostSchema = require("./post");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: "Name must be longer than 2 characters.",
    },
    required: [true, "name is required."],
  },
  // postCount: Number,
  posts: [PostSchema],
  likes: Number,
});

UserSchema.virtual("postCount").get(function () {
  // console.log('hello world!');
  return this.posts.length;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;

// node
// 1+1
// const User = require('./src/user');
// User
// joe = new User({});
// joe.postCount
