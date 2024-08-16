const Driver = require("../models/driver");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there via greeting" });
  },

  create(req, res) {
    // console.log(req.body);
    // res.send({hi:'there via create'});
    const driveProps = req.body;
    Driver.create(driveProps).then((driver) => {
      // console.log(driver);
      // return the created object via res.send 
      res.send(driver);
    });
  },
};
