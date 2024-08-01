const assert = require("assert");
const User = require("../src/user");
// const { default: mongoose } = require("mongoose");

describe("Subdocuments test", () => {
  it.only("can create a subdocument", (done) => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle title" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "PostTitle title");
        done();
      });
  });
});
