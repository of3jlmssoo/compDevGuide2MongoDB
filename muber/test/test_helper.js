const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost/muber_test");
  mongoose.connection
    .once("open", () => done())
    .on("error", (err) => {
      console.warn("warning", err);
    });
});

beforeEach((done) => {
  const { cities } = mongoose.connection.collections;
  cities
    .drop()
    .then(() => done())
    .catch(() => done());
});

// users.drop(() => {
//     comments.drop(() => {
//       blogposts.drop(() => {
//         done();
//       });
//     });
//   });
