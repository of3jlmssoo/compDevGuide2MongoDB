const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there via greeting" });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;
    console.log(`===> ${parseFloat(lng)} === ${parseFloat(lat)} ==========================>>>>>>`);

    // Driver.findOne({
    //   // location: { $near: [parseFloat(-80.253), parseFloat(25.791)], $maxDistance: 100000 },
    //   // _id : "66bf1a704ad9183020308e16"
    //   email: seatle@test.com
    // }).then((drivers) => {
    //   console.log(drivers);
    // });

    Driver.find({
      // email: 'seattle@test.com',
      location: {
        $nearSphere: {
          $geometry: {
            type: { type: String, enum: ["Point"] },
            coordinates: [parseFloat(-73.1), parseFloat(25.8)],
          },
          $minDistance: 0.01,
          $maxDistance: 5000,
        },
      },
      // location: {
      //   // $near: [parseFloat(-80.253), parseFloat(25.791)], $maxDistance: 100
      //   $near: [-80.253, 25.791],
      //   $minDistance: 0,
      //   $maxDistance: 1,
      //   // $nearSphere: {
      //   //   $geometry: {
      //   //     type: "Point",
      //   //     coordinates: [-80.253, 25.791],
      //   //     $minDistance: 0,
      //   //     $maxDistance: 5000,
      //   //   },
      //   // },
      // },
    }).then((drivers) => {
      console.log(drivers);
    });
  },

  create(req, res, next) {
    // console.log(req.body);
    // res.send({hi:'there via create'});
    const driveProps = req.body;
    Driver.create(driveProps)
      .then((driver) => {
        // console.log(driver);
        // return the created object via res.send
        res.send(driver);
      })
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    // console.log("----------------------------------------------");
    // console.log(driverId);
    // console.log("----------------------------------------------");

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then((driver) => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndDelete({ _id: driverId })
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  },
};
