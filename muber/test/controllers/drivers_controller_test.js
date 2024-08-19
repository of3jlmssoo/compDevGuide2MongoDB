const assert = require("assert");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
// const { find, populate } = require("../../models/driver");
const City = mongoose.model("City");

const Driver = mongoose.model("driver");

describe("drivers controller", () => {
  it("post to /api/drivers create a new driver!", (done) => {
    Driver.countDocuments().then((count) => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.countDocuments().then((newCount) => {
            // console.log("newCount = ", newCount, " and count = ", count);
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it("put to /api/drivers/id edits an existing driver", (done) => {
    const driver = new Driver({ email: "t@t.com", driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then((driver) => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("delete to /api/drivers/id can delete a driver", (done) => {
    const driver = new Driver({ email: "t@t.com", driving: false });
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then((driver) => {
            // assert(driver===undefined);
            assert(driver === null);
            done();
          });
        });
    });
  });

  it.only("mongoose manual geojson 3", (done) => {
    const colorado = {
      type: "Polygon",
      coordinates: [
        [
          [-109, 41],
          [-102, 41],
          [-102, 37],
          [-109, 37],
          [-109, 41],
        ],
      ],
    };
    const denver = { type: "Point", coordinates: [-104.9903, 39.7392] };
    // const City = db.model(
    //   "City",
    //   new Schema({
    //     name: String,
    //     location: {
    //       type: pointSchema,
    //       index: "2dsphere", // Create a special 2dsphere index on `City.location`
    //     },
    //   })
    // );

    City.create({ name: "Denver", location: denver })
      .then(() => City.findOne().where("location").within(colorado))
      .then((doc) => {
        assert.equal(doc.name, "Denver");
        done();
      });
  });

  it("mongoose manual geojson 2", (done) => {
    const colorado = {
      type: "Polygon",
      coordinates: [
        [
          [-109, 41],
          [-102, 41],
          [-102, 37],
          [-109, 37],
          [-109, 41],
        ],
      ],
    };
    const denver = { type: "Point", coordinates: [-104.9903, 39.7392] };
    City.create({ name: "Denver", location: denver })
      .then(() => City.findOne().where("location").within(colorado))
      .then((doc) => {
        assert.equal(doc.name, "Denver");
        done();
      });
  });

  it("mongoose manual geojson 1", (done) => {
    const colorado = {
      type: "Polygon",
      coordinates: [
        [
          [-109, 41],
          [-102, 41],
          [-102, 37],
          [-109, 37],
          [-109, 41],
        ],
      ],
    };
    const denver = { type: "Point", coordinates: [-104.9903, 39.7392] };
    City.create({ name: "Denver", location: denver })
      .then(() =>
        City.findOne({
          location: {
            $geoWithin: {
              $geometry: colorado,
            },
          },
        })
      )
      .then((doc) => {
        assert.equal(doc.name, "Denver");
        done();
      });

    // Driver.createIndexes({ location: "2dsphere" });
    // const SquawValley = new Driver({
    //   email: "SquawValley@test.com",
    //   location: { coordinates: [-120.24, 39.21] },
    // });
    // const MammothLales = new Driver({
    //   email: "MammothLales@test.com",
    //   location: { coordinates: [-118.9, 37.61] },
    // });
    // const Aspen = new Driver({
    //   email: "Aspen@test.com",
    //   location: { coordinates: [-106.82, 39.18] },
    // });
    // const Whistler = new Driver({
    //   email: "Whistler@test.com",
    //   location: { coordinates:  [-122.96, 50.12] },
    // });

    // Promise.all([SquawValley.save(), MammothLales.save(), Aspen.save(), Whistler.save()])
    // .then(() => {
    //   Driver.find({})
    //   // .populate(
    //   //   'driver'
    //   // )
    //   .then(drivers=>{
    //       console.log("----------------------------------------------");
    //       drivers.flatMap(
    //         (x) => console.log(x.location.coordinates)
    //       );
    //       console.log("==============================================");
    //       Driver.find({
    //       location:{
    //         $geoIntersects:{
    //           $geometry: {
    //             type: "Polygon",
    //             coordinates:[[
    //               [-109, 41],
    //               [-102, 41],
    //               [-102, 37],
    //               [-109, 37],
    //               [-109, 41]
    //             ]]
    //           }
    //         }
    //       }
    //       // location:{
    //       //   $geoWithin:{
    //       //      $centerSphere: [[-122.5, 37.7], 300 / 3963.2]
    //       //   }
    //       // }
    //     }).then((ds)=>{
    //       console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX");
    //       console.log(ds);
    //       console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXX");

    //     });

    // console.log("ZZZZZZZZZZZZzZZZZZZZZZZZZZZ");
    // done();
    //     });
    // });
  });
});

// request(app)
//   .get("/api/drivers?lng=-80&lat=25")
//   .end((err, response) => {
//     console.log("----------------------------------------------");
//     // console.log(response);
//     // console.log(err);
//     console.log("----------------------------------------------");
//     done();
//   });
