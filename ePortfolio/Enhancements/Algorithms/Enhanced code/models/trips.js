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
tripSchema.index({ code: 1 }, { unique: true });
tripSchema.index({ perPerson: 1 });
tripSchema.index({ start: 1 });
tripSchema.index({ resort: 1 });
tripSchema.index({ name: 1 });

module.exports = mongoose.model("Trip", tripSchema);
