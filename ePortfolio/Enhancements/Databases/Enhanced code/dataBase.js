require("dotenv").config();
const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/travlr";

mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

require("./models/trips");
require("./models/user");
