const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, maxlength: 30 },
  lastName: { type: String, maxlength: 30 },
  email: { type: String, maxlength: 320, required: true },
  phone: { type: String, maxlength: 15 },
  googleId: { type: String },
  password: { type: String, required: true },
  picture: { type: String },
  posts: { type: Array, default: [] },
  comments: { type: Array, default: [] },
  moderator: { type: Boolean, default: false },
  timestamp: { type: Date },
});

module.exports = mongoose.model("User", UserSchema);