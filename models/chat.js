const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  members: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  unReadCounts: { type: Object },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
