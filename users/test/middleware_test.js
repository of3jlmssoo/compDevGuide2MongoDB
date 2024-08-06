const assert = require("assert");
const User = require("../src/user");
const BlogPost = require("../src/blogPost");

// const { default: mongoose } = require("mongoose");

describe("middleware test", () => {
  it.only("preparation for middleware", (done) => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is",
    });

    bp2 = new BlogPost({
      title: "second post",
      content: "second post content",
    });

    joe.blogPosts.push(blogPost);
    joe.blogPosts.push(bp2);

    Promise.all([joe.save(), blogPost.save(), bp2.save()]).then(() => {
      BlogPost.countDocuments({}).then((count) => {
        console.log("--> ", count);
        done();
      });
    });
  });
});
