require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("./config/passport");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// Set up mongoose
const mongoose = require("mongoose");
const mongoDB = (process.envGOOGLE_CLIENT_ID =
  "508773087854-ntd2udfm7p2n4hcm02i62b3a2832qi9b.apps.googleusercontent.com");
GOOGLE_CLIENT_SECRET = "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".MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

module.exports = app;