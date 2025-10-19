const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./app_api/dataBase");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Try later, Too many requests." },
});

app.use("/api/", apiLimiter);

const helmet = require("helmet");

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// const port = 3000;
const port = process.env.PORT || 3000;

// view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app_server", "views"));

// CORS
app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use(
  "/travlr-getaways/public/images",
  express.static(path.join(__dirname, "public", "images"))
);

// routes
const indexRouter = require("./app_server/routes/index");
const apiRouter = require("./app_api/routes/index");

app.use("/", indexRouter);
app.use("/api", apiRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err);

  res.status(err.status || 500).json({
    error: {
      code: err.status || 500,
      message: err.message || "Internal Server Error",
      details: err.details || null,
    },
  });
});

app.listen(port, () => {
  console.log(`Travlr app running at http://localhost:${port}`);
});
