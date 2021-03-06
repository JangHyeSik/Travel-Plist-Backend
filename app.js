require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const auth = require("./routes/auth");
const travels = require("./routes/travels");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", auth);
app.use("/travels", travels);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
