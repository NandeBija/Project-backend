const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

async function getUser(req, res, next) {
    let user;
    try {
      user = await User.findById(req.params.id);
  
      if (!user) res.status(404).json({ message: "Could not find user" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.user = user;
    return next();
  }
  
  async function getProduct(req, res, next) {
    let product;
    try {
      product = await Product.findById(req.params.id);
      if (!product) res.status(404).json({ message: "Could not find product" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    res.product = product;
    return next();
  }

  async function getCart(req,res,next){
    let cart;
    try {
      cart = await Cart.find()
      if (!cart) {
        
      }
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }
  
  module.exports = { getUser, getProduct,getCart };