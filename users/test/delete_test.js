// remove() has been deprecated
// use deleteOne or deleteMany
const assert = require("assert");
const User = require("../src/user");

describe("deleteing a user", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it("model instance remove", () => {
    joe
      .deleteOne({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it("class method remove", () => {
    User.deleteOne({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it("class method findAndRemove", (done) => {
    User.findOneAndDelete({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
  it("class method findByIdAndRemove", () => {
    User.findByIdAndDelete(joe._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === nul);
        done();
      });
  });
});
