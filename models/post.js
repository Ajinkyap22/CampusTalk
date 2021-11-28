const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, maxlength: 300, required: true },
  text: { type: String },
  file: { type: String },
  anonymous: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  forum: { type: Schema.Types.ObjectId, ref: "Forum", required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  upvotes: { type: Number, defautl: 0 },
  downvotes: { type: Number, defautl: 0 },
  pinned: { type: Boolean, default: false },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Post", PostSchema);
