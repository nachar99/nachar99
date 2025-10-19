const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./app_api/dataBase");
const cors = require("cors");

const app = express();
const port = 3000;

// view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "app_server", "views"));

// CORS (so Angular at :4200 can call the API)
app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
const indexRouter = require("./app_server/routes/index");
const apiRouter = require("./app_api/routes/index");

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Travlr app running at http://localhost:${port}`);
});
