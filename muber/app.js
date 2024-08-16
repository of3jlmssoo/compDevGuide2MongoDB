const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/routes");
const app = express();

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost/muber");
}
// === 'test' case is in test_helper.js

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  // console.log("----------------------------------------------");
  // console.log(err);
  // console.log("----------------------------------------------");
  // console.log(err.errors.email);
  // console.log("----------------------------------------------");
  res.status(422).send({ error: err._message });
});

module.exports = app;
