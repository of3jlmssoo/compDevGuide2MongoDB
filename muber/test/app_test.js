const assert = require("assert");
const request = require("supertest");
const app = require("../app");

describe("the express app!", () => {
  it("handles a GET request to /api", (done) => {
    request(app)
      .get("/api")
      .end((err, response) => {
        // console.log(response.body.hi);
        // assert(response.body.hi === 'there');
        assert(response.body.hi === "there via greeting");
        done();
      });
  });
});
