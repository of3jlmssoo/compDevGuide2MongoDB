const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  // let joe;

  let alex, joe, maria, zack;
  beforeEach((done) => {
    // joe = new User({ name: "Joe" });
    // joe.save().then(() => {
    //   done();
    // });
    alex = new User({ name: "Alex" });
    joe = new User({ name: "Joe" });
    maria = new User({ name: "Maria" });
    zack = new User({ name: "Zack" });
    Promise.all([alex.save(), joe.save(), maria.save(), zack.save()]).then(() => done());
  });

  it("finds all users with a name of joe", (done) => {
    User.find({ name: "Joe" }).then((users) => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with a particular id", (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      assert(user.name === "Joe");
      done();
    });
  });

  it.only("can skip and limit the result set", (done) => {
    // User.find({}).then((users) => {
    //   console.log("can skip? users ", users.length);
    // });

    // 
    User.find({})
      .sort({name:1})
      .skip(1)
      .limit(2)
      .then((users) => {
        console.log("can skip? users ", users.length);
        assert(users.length===2);
        assert(users[0].name==="Joe");
        assert(users[1].name==="Maria");
        done();
      });
  });
});
