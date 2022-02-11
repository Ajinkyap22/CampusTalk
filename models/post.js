const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  text: { type: String },
  file: { type: String },
  anonymous: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  forum: { type: Schema.Types.ObjectId, ref: "Forum", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  pinned: { type: Boolean, default: false },
  timestamp: { type: Date },
  important: { type: Boolean, default: false },
});

module.exports = mongoose.model("Post", PostSchema);
