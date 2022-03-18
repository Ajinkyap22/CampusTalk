require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
require("./config/passport");

const usersRouter = require("./routes/users");
const forumRouter = require("./routes/forum");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const replyRouter = require("./routes/reply");
const chatRouter = require("./routes/chat");

const app = express();

// Set up mongoose
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

app.use("/api/users", usersRouter);
app.use("/api/forums", forumRouter);
app.use("/api/forums/:id/posts", postRouter);
app.use("/api/forums/:forumId/posts/:postId/comments", commentRouter);
app.use("/api/forums/:id/posts/:id/comments/:id/replies", replyRouter);
app.use("/api/chats", chatRouter);

module.exports = app;
