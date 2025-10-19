const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    if (!trips.length) {
      return res.status(404).json({ message: "No trips found" });
    }
    res.status(200).json(trips);
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;
  try {
    console.log("Requested tripCode:", tripCode);
    const trip = await Trip.findOne({ code: tripCode });
    if (!trip) {
      return res
        .status(404)
        .json({ message: `Trip not found with code ${tripCode}` });
    }
    res.status(200).json(trip);
  } catch (err) {
    console.error(`Error finding trip by code (${tripCode}):`, err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const tripsCreate = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json(trip);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const tripsUpdateByCode = async (req, res) => {
  try {
    const updated = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const tripsDeleteByCode = async (req, res) => {
  try {
    const deleted = await Trip.findOneAndDelete({ code: req.params.tripCode });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(204).end();
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsCreate,
  tripsUpdateByCode,
  tripsDeleteByCode,
};
