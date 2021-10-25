const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
  forumName: { type: String, maxlength: 30, required: true },
  description: { type: String, maxlength: 100, required: true },
  rules: { type: Array, default: [] },
  picture: { type: String },
  members: { type: Array, default: [] },
  posts: { type: Array, default: [] },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Forum", ForumSchema);
