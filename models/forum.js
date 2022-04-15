const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForumSchema = new Schema({
  forumName: { type: String, maxlength: 200, required: true },
  address: { type: String, maxlength: 100, required: true },
  website: { type: String, maxlength: 2000, required: true },
  email: { type: String, maxlength: 320, required: true },
  rules: { type: Array, default: [] },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  moderators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  joinRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Forum", ForumSchema);
