const tripsEndpoint = "http://localhost:3000/api/trips";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { getTrips } = require("../services/apiClient");

const mongoose = require("mongoose");
const Trip = require("../../app_api/models/trips");

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

const travel = async function (req, res) {
  try {
    const params = {
      page: req.query.page || 1,
      pageSize: req.query.pageSize || 12,
      sort: req.query.sort || "name",
      dir: req.query.dir || "asc",
      minPrice: req.query.minPrice || "",
      maxPrice: req.query.maxPrice || "",
      resort: req.query.resort || "",
      q: req.query.q || "",
    };

    const result = await getTrips(params);
    const trips = Array.isArray(result)
      ? result
      : Array.isArray(result.data)
      ? result.data
      : [];
    const meta = result.meta || null;

    let message = null;
    if (!trips.length) {
      message = "No trips match your filters.";
    }

    return res.render("trips", {
      title: "Travlr Getaways",
      trips,
      message,
      meta,
      params,
    });
  } catch {
    return res.render("trips", {
      title: "Travlr Getaways",
      trips: [],
      message: "API lookup error",
      meta: null,
      params: req.query || {},
    });
  }
};
module.exports = {
  travel,
};
