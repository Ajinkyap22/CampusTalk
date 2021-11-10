const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
  forumName: { type: String, maxlength: 200, required: true },
  address: { type: String, maxlength: 100, required: true },
  website: { type: String, maxlength: 2000, required: true },
  email: { type: String, maxlength: 320, required: true },
  description: { type: String, maxlength: 100 },
  rules: { type: Array, default: [] },
  picture: { type: String },
  members: { type: Array, default: [] },
  posts: { type: Array, default: [] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Forum", ForumSchema);
