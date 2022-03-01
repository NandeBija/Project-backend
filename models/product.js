const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    required: false,
    default: "https://picsum.photos/1920",
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
