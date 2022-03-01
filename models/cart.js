const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId:{
        type: Number,
        required: true
    },
  item: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  
  img: {
    type: String,
    required: false,
    default: "https://picsum.photos/1920",
  },
  price:{
      type: String,
      required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);