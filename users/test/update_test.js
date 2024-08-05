// update() deprecated
// use updateOne or updateMany

const assert = require("assert");
const User = require("../src/user");
// const { default: mongoose } = require("mongoose");

describe("Updating records", () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: "Joe", postCount: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        // console.log("---------------\n", users, "---------------\n");
        // log.console("length ", users.length, " ", users[0].name);
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  }

  it("instance type using set n save", (done) => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
    done();
  });

  it("model instance can update", (done) => {
    assertName(joe.updateOne({ name: "Alex" }), done);
  });

  it("A model class can update", (done) => {
    assertName(User.updateMany({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A model class can update one record", (done) => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });

  it("A model class can find a record with an Id and update", (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });


  // postCountをvirtual typeにするのでアップデートは行わない
  it("1st : A user can have their postcount incremented by 1", (done) => {
    // User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }).then((user) => {
    // User.findOneAndUpdate({ name: "Joe" }, { postCount: 2 }).then((user) => {
    User.findOneAndUpdate({ name: "Joe" }, { likes: 2 }).then((user) => {
      user.save();
      // done();
      User.findOne({ _id: joe._id }).then((user) => {
        // console.log(user.postCount);
        assert(user.likes === 2);
        done();
      });
    });
  });
  it("2nd : A user can have their postcount incremented by 1", (done) => {
    // User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }).then((user) => {
    User.findOneAndUpdate({ name: "Joe" }, { $inc: { likes: 10 } }).then((user) => {
      user.save();
      // done();
      User.findOne({ _id: joe._id }).then((user) => {
        // console.log(user.postCount);
        assert(user.likes === 10);
        done();
      });
    });
  });
});
