const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  length: { type: String, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Trip", tripSchema);
