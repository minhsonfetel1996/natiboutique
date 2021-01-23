/**
 * @author spm
 */
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
} else if (process.env.NODE_ENV === "development") {
  app.use(helmet());
}
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

require("./db_connection")();
require("../routes/app_routes")(app);

module.exports = app;
