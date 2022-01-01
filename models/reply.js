const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  text: { type: String, maxlength: 5000, required: true },
  file: { type: String },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Reply", ReplySchema);
