const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, maxlength: 5000, required: true },
  file: { type: String },
  sender: { type: Schema.Types.ObjectId, required: true },
  receiver: { type: Schema.Types.ObjectId, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
