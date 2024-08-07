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
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "blogPost",
    },
  ],
});

UserSchema.virtual("postCount").get(function () {
  // console.log('hello world!');
  return this.posts.length;
});

UserSchema.pre("deleteOne", { document: true }, function (next) {
  // deleteManyがModel.deleteMany()なのでdocument:trueが必要(なよう)
  const BlogPost = mongoose.model("blogPost");
  BlogPost.deleteMany({ _id: { $in: this.blogPosts } }).then(() => {
    // console.log("next!!!!!!!", this.blogPosts);
    next();
  });
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
