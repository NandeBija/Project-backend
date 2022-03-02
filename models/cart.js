const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "user",
  // },
  products: [
    {
      productId: Number,
      quantity: Number,
      name: String,
      price: Number,
      about: String,
      image: String,
    },
  ],

  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
