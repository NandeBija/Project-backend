const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // productNumber: {
  //   type: Number,
  //   required: true,
  //   unique: true,
  // },
  product_id: {
    type: String,
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
    required: false,
  },
  category: {
    type: String,
    required: false,
  },

  image: {
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
    required: false,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
