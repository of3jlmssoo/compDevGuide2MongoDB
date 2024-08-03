const assert = require("assert");
const User = require("../src/user");
// const { default: mongoose } = require("mongoose");

describe("Subdocuments test", () => {


  it("1 can create a subdocument", (done) => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle title" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user.posts[0].title === "PostTitle title");
        done();
      });
  });

  it("2 Can add subdocuments to an existing record", (done) => {
    const joe = new User({
      name: "Joe",
      posts: [],
    });

    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        user.posts.push({ title: "New Post!" });
        return user.save();
      })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        // console.log(user.posts[0].title);
        assert(user.posts[0].title === "New Post!");
        done();
      });
  });

  it('can remove an existing subdocument', (done)=>{
    const joe = new User({
      name:'Joe',
      posts: [{title:'new title'}]
    });

    // console.log('-------');

    joe.save()
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
        const post = user.posts[0];
        // post.remove();
        user.posts.pull(post);
        return user.save();
      })
      .then(()=>User.findOne({name:'Joe'}))
      .then((user)=>{
        // console.log(user.posts.length);
        assert(user.posts.length===0);
        done();
      });
  });

});
