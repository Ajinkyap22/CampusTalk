require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
require("./config/passport");

const usersRouter = require("./routes/users");
const forumRouter = require("./routes/forum");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const replyRouter = require("./routes/reply");
const chatRouter = require("./routes/chat");
const notificationRouter = require("./routes/notification");
const eventRouter = require("./routes/event");
const mailRouter = require("./routes/mail");

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
// serve images from the uploads folder in public
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(compression());
app.use(
  helmet({
    //   contentSecurityPolicy: {
    //     directives: {
    //       defaultSrc: ["'self'"],
    //       styleSrc: ["'self'", "'unsafe-inline'"],
    //       scriptSrc: [
    //         "'self'",
    //         "'unsafe-inline'",
    //         "'unsafe-eval'",
    //         "https://www.google-analytics.com/analytics.js",
    //       ],
    //       imgSrc: ["'self'", "data:"],
    //       fontSrc: ["'self'", "data:"],
    //       connectSrc: ["'self'", "https://www.google-analytics.com/analytics.js"],
    //     },
    //   },
    // })
    contentSecurityPolicy: false,
  })
);

app.use("/api/users", usersRouter);
app.use("/api/forums", forumRouter);
app.use("/api/forums/:id/posts", postRouter);
app.use("/api/forums/:forumId/posts/:postId/comments", commentRouter);
app.use("/api/forums/:id/posts/:id/comments/:commentId/replies", replyRouter);
app.use("/api/chats", chatRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/events", eventRouter);
app.use("/api/mail", mailRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

module.exports = app;
