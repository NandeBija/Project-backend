const express = require("express");
const authenticateToken = require("../middleware/authenticate");
const { getCart } = require("../middleware/find");
const { getProduct } = require("../middleware/find");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router();

// GET ITEMS IN CART

// router.get("/:id", getCart, (req, res, next) => {
//   return res.send(res.user);
//   });

//   UPDATE CART
// router.put('/', [authenticateToken, getPost], async (req, res)=>{
//     const user = await user.findById(req.user._id)
//     const  inCart = user.cart.some(prod=>prod._id == req.params.id)

//     if(inCart){
//         const product = user.cart.find((prod)=> prod._id == req.params.id )
//         product.qty += req.body.qty

//         const updatedUser = await user.save()

//         return res.send(updatedUser.cart)
//     } else{
//         user.cart.push({...res.product, qty: req.body.qty})
//         const updatedUser = await user.save()
//         return res.send(updatedUser.cart)

//     }

// })

// cart
//getting all items in cart
// router.get("/:id/cart", authenticateToken, async (req, res, next) => {
//   try {
//     res.json(req.user.cart);
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// });

//updates the items in the users cart
// router.put(
//   "/:id/cart",
//   [authenticateToken, getProduct],
//   async (req, res, next) => {
//     const user = await User.findById(req.user._id);
//     const inCart = user.cart.some((prod) => prod._id == req.params.id);
//     if (inCart) {
//       product.quantity += req.body.quantity;
//       const updatedUser = await user.save();
//       try {
//         res.status(201).json(updatedUser.cart);
//       } catch (error) {
//         res.status(500).json(console.log(error));
//       }
//     } else {
//       try {
//         // console.log(Array.isArray(user.cart))
//         // user.cart = []
//         let product_id = res.product._id;
//         let name = res.product.name;
//         let category = res.product.category;
//         let img = res.product.img;
//         let price = res.product.price;
//         let quantity = req.body;
//         let created_by = req.user._id;
//         user.cart.push({
//           product_id,
//           name,
//           category,
//           img,
//           price,
//           quantity,
//           created_by,
//         });
//         const updatedUser = await user.save();
//         res.status(201).json(updatedUser.cart);
//       } catch (error) {
//         res.status(500).json(console.log(error));
//       }
//     }
//   }
// );

router.post("/cart", async (req, res) => {
  const { productId, quantity, name, price, about, image } = req.body;

  const userId = "6218d8c42148a562c05c644e"; // the logged in user id

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      // if (itemIndex > -1) {
      //   //product exists in the cart, update the quantity
      //   let productItem = cart.products[itemIndex];
      //   productItem.quantity = quantity;
      //   cart.products[itemIndex] = productItem;
      // } else {
      //   //product does not exists in cart, add new item
      //   cart.products.push({ productId, quantity, name, price });
      // }
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
});
module.exports = router;
