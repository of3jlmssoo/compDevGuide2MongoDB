const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

// const { default: mongoose } = require("mongoose");

describe("middleware test", () => {
  let joe, blp1, blp2;
  beforeEach((done) => {
    joe = new User({ name: "Joe" });
    blp1 = new BlogPost({ title: "tl1", content: "tl1s content" });
    blp2 = new BlogPost({ title: "tl2", content: "tl2s content" });

    joe.blogPosts.push(blp1);
    joe.blogPosts.push(blp2);

    Promise.all([joe.save(), blp1.save(), blp2.save()]).then(() => done());
  });

  it("preparation for middleware", (done) => {
    // joe = new User({ name: "Joe" });
    // blogPost = new BlogPost({
    //   title: "JS is Great",
    //   content: "Yep it really is",
    // });
    // bp2 = new BlogPost({
    //   title: "second post",
    //   content: "second post content",
    // });
    // joe.blogPosts.push(blogPost);
    // joe.blogPosts.push(bp2);
    // Promise.all([joe.save(), blogPost.save(), bp2.save()]).then(() => {
    //   BlogPost.countDocuments({}).then((count) => {
    //     // console.log("--> ", count);
    //     assert(count===2);
    //     done();
    //   });
    // });
    BlogPost.countDocuments({}).then((count) => {
      // console.log("--> ", count);
      assert(count === 2);
      done();
    });
  });

  
  it("users clean up dangling blogposts on remove", (done) => {
    // BlogPost.countDocuments({}).then((c) => {
    //   console.log("--> c ", c);
    // });
    joe
      .deleteOne()
      .then(() => BlogPost.countDocuments({}))
      .then((count) => {
        // console.log("===> count : ", count);
        assert(count === 0);
        done();
      });
  }).timeout(2000);
});
