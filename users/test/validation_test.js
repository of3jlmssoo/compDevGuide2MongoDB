const assert = require("assert");
const User = require("../src/user");
// const { default: mongoose } = require("mongoose");

describe("Validating Records", () => {
  it("a user name required", () => {
    const user = new User({ name: undefined });
    // const user = new User({ name: "Joe" });

    const validationResult = user.validateSync();
    // assert.equal(validationResult, undefined);

    // console.log("==> ", validationResult.errors.name.message);
    const { message } = validationResult.errors.name;
    assert(message === "name is required.");
  });

  it.only("user name length check", () => {
    const user = new User({ name: "Jo" });

    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters.');
  });
});
