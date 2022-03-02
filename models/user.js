const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
    default: null,
  },
  about: {
    type: String,
    required: false,
    default: null,
  },
  joinDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  cart: {
    try: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
