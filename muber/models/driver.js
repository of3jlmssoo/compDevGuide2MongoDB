const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  // type: { type: String, default: "Point" },
  // type: { type: String, enum: ["Point"] },
  // coordinates: { type: [Number], index: "2d" },
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  // geometry: PointSchema,
  location: {
    type: { type: String, enum: ["Point"] },
    coordinates: { type: [Number], index: "2dsphere", ref: "Coordinates" },
  },
});

// DriverSchema.index({location:'2dsphere'});
const Driver = mongoose.model("driver", DriverSchema);
module.exports = Driver;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const citySchema = new mongoose.Schema({
  name: String,
  location: {
    type: pointSchema,
    required: true,
  },
});
const City = mongoose.model("City", citySchema);
module.exports = City;
