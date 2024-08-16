const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there via greeting" });
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
