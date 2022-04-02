const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  type: { type: String, required: true },
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId, ref: "User" },
  forum: { type: Schema.Types.ObjectId, ref: "Forum" },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
  timestamp: { type: Date, default: Date.now },
  seen: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Notification", NotificationSchema);
