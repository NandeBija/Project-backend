const express = require("express");
const authenticateToken = require("../middleware/authenticate")
const { getCart } = require("../middleware/find");
const Cart = require("../models/cart");
const Product = require("../models/product");
const router = express.Router()


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






module.exports = router;