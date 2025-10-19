const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");

function httpError(status, message, details = null) {
  const err = new Error(message);
  err.status = status;
  err.details = details;
  return err;
}

const tripsList = async (req, res, next) => {
  try {
    const allowedSort = new Set(["name", "perPerson", "start", "resort"]);
    const allowedDir = new Set(["asc", "desc"]);

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const pageSizeRaw = parseInt(req.query.pageSize, 10);
    const pageSize = Math.min(Math.max(pageSizeRaw || 12, 1), 50);

    const sortField = allowedSort.has(req.query.sort) ? req.query.sort : "name";
    const sortDir = allowedDir.has(req.query.dir) ? req.query.dir : "asc";
    const sortSpec = { [sortField]: sortDir === "asc" ? 1 : -1 };

    const filter = {};
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;
    const resort = req.query.resort ? String(req.query.resort).trim() : null;
    const q = req.query.q ? String(req.query.q).trim() : null;

    if (Number.isFinite(minPrice)) {
      filter.perPerson = { ...(filter.perPerson || {}), $gte: minPrice };
    }
    if (Number.isFinite(maxPrice)) {
      filter.perPerson = { ...(filter.perPerson || {}), $lte: maxPrice };
    }
    if (resort) {
      filter.resort = resort;
    }
    if (q) {
      filter.name = { $regex: q, $options: "i" };
    }

    const skip = (page - 1) * pageSize;

    const [totalDocs, items] = await Promise.all([
      Trip.countDocuments(filter),
      Trip.find(filter)
        .sort(sortSpec)
        .skip(skip)
        .limit(pageSize)
        .select("code name description length start resort perPerson image")
        .lean(),
    ]);

    const totalPages = Math.max(Math.ceil(totalDocs / pageSize), 1);

    return res.status(200).json({
      data: items,
      meta: {
        page,
        pageSize,
        totalDocs,
        totalPages,
        sort: sortField,
        dir: sortDir,
        filters: {
          minPrice: Number.isFinite(minPrice) ? minPrice : null,
          maxPrice: Number.isFinite(maxPrice) ? maxPrice : null,
          resort: resort || null,
          q: q || null,
        },
      },
    });
  } catch (err) {
    return next(err);
  }
};

const tripsFindByCode = async (req, res, next) => {
  const tripCode = req.params.tripCode;
  try {
    const trip = await Trip.findOne({ code: tripCode }).lean();
    if (!trip) {
      return next(httpError(404, `Trip not found with code ${tripCode}`));
    }
    return res.status(200).json(trip);
  } catch (err) {
    return next(err);
  }
};

const tripsCreate = async (req, res, next) => {
  try {
    const trip = await Trip.create(req.body);
    return res.status(201).json(trip);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
};

const tripsUpdateByCode = async (req, res, next) => {
  try {
    const updated = await Trip.findOneAndUpdate(
      { code: req.params.tripCode },
      req.body,
      { new: true, runValidators: true }
    ).lean();
    if (!updated) {
      return next(httpError(404, "Trip not found"));
    }
    return res.json(updated);
  } catch (err) {
    err.status = 400;
    return next(err);
  }
};

const tripsDeleteByCode = async (req, res, next) => {
  try {
    const deleted = await Trip.findOneAndDelete({
      code: req.params.tripCode,
    }).lean();
    if (!deleted) {
      return next(httpError(404, "Trip not found"));
    }
    return res.status(204).end();
  } catch (err) {
    err.status = 400;
    return next(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsCreate,
  tripsUpdateByCode,
  tripsDeleteByCode,
};
