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

  // function assertName(operation, done) {
  //   operation
  //     .then(() => User.find({}))
  //     .then((users) => {
  //       // console.log(users);
  //       assert(users.length === 1);
  //       assert(users[0].name === "Alex");
  //       done();
  //     });
  // }

  // do not update postCount after postCount became virtual type
  it("promise test", () =>
    User.findOneAndUpdate({ name: "Joe" }, { likes: 7 })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        // console.log(user);
        assert.equal(user.likes, 7);
        // return user.destroy() // <- このPromiseが戻り値になる
      }));
});
