const DriverController = require('../controllers/drivers_controller');

module.exports = (app) => {
  // app.get("/api", (req, res) => {
  //   res.send({ hi: "there" });
  // });
  app.get('/api', DriverController.greeting);

  app.post('/api/drivers', DriverController.create);
};
