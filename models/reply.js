const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  text: { type: String, maxlength: 5000 },
  file: { type: String },
  originalFileName: { type: Object },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reply", ReplySchema);
