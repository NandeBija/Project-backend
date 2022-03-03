require("dotenv").config;

const express = require("express");
const User = require("../models/user");
const Cart = require("../models/cart");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getUser, getProduct } = require("../middleware/find");
const authenticateToken = require("../middleware/authenticate");
const authenticate = require("../middleware/authenticate");
const { application } = require("express");

const router = express.Router();

let user;
let cart;
// GET ALL USER
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET ONE USER
router.get("/:id", getUser, (req, res, next) => {
  res.send(res.user);
});

// CREATE/REGISTER A USER
router.post("/", async (req, res, next) => {
  const { name, email, contact, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    contact,
    password: hashedPassword,
  });

  try {
    const newUser = await user.save();

    try {
      const access_token = jwt.sign(
        JSON.stringify(newUser),
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPDATE USERS
router.put("/:id", getUser, async (req, res, next) => {
  const { name, contact, password, avatar, about } = req.body;
  if (name) res.user.name = name;
  if (contact) res.user.contact = contact;
  if (avatar) res.user.avatar = avatar;
  if (about) res.user.about = about;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    res.user.password = hashedPassword;
  }

  try {
    const updatedUser = await res.user.save();
    res.status(201).send(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE A USER
router.delete("/:id", getUser, async (req, res, next) => {
  const user = { id: req.params.id };
  try {
    await res.user.remove();
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN USER WITH EMAIL AND PASSWORD
router.patch("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) res.status(404).json({ message: "Could not find user" });
  if (await bcrypt.compare(password, user.password)) {
    try {
      const access_token = jwt.sign(
        JSON.stringify(user),
        process.env.MONGO_PASS
      );
      res.status(201).json({ jwt: access_token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res
      .status(400)
      .json({ message: "Email and password combination do not match" });
  }
});

//POST PRODUCTS IN CART

router.post("/cart", async (req, res) => {
  const { productId, quantity, name, price, about, image } = req.body;

  const userId = "6218d8c42148a562c05c644e"; // the logged in user id

  try {
    var cart = await Cart.findOne({ userId });
    console.log(cart);

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price, about, image });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        userId,
        products: [{ productId, quantity, name, price, about, image }],
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
  res.send("Product added to cart");
  console.log("done")
});


module.exports = router;
