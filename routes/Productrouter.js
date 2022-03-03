require("dotenv").config;

const express = require("express");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const find = require("../middleware/find");
const { getProduct } = require("../middleware/find");
const authenticateToken = require("../middleware/authenticate");

const router = express.Router();
let product;

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET one product by id
router.get("/:id", getProduct, async (req, res, next) => {
  res.send(res.product);
});

// CREATE a product
router.post("/", async (req, res, next) => {
  const { name, about, author, category, image, price } = req.body;

  const product = new Product({
    name,
    about,
    author,
    category,
    image,
    price,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a product
router.put("/:id", getProduct, async (req, res, next) => {
  if (req.user._id !== res.product.author)
    res.status(400).json({
      message: "You do not have the permission to update this product",
    });
  const { name, price, about, image, author } = req.body;
  if (name) res.product.name = name;
  if (price) res.product.price = price;
  if (about) res.product.about = about;
  if (image) res.product.image = image;
  if (author) res.product.image = author;

  try {
    const updatedProduct = await res.product.save();
    res.status(201).send(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a product
router.delete("/:id", getProduct, async (req, res, next) => {
  const product = { id: req.params.id };
  try {
    await res.product.remove();
    res.json({ message: "product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
