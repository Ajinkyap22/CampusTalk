const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  video: { type: String },
  document: { type: String },
  link: { type: String },
  forum: { type: Schema.Types.ObjectId, ref: "Forum", required: true },
  date: { type: Date, required: true },
  time: { type: String },
  venue: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", EventSchema);
