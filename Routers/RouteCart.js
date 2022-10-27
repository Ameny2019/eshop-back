const routerCart = require("express").Router();
const passport = require("passport");
const cartController = require("../Controllers/cartController");

routerCart.post("/addItem", passport.authenticate("bearer", { session: false }), cartController.addItemToCart);
routerCart.post("/createCart", passport.authenticate("bearer", { session: false }), cartController.createCart);
routerCart.get("/getCart", passport.authenticate("bearer", { session: false }), cartController.getCart);
routerCart.delete("/empty-cart", passport.authenticate("bearer", { session: false }), cartController.emptyCart);
routerCart.delete("/removeSingleProduct/:id", passport.authenticate("bearer", { session: false }), cartController.removeSingleProduct)
routerCart.put("/updateCart/:id", passport.authenticate("bearer", { session: false }), cartController.updateCart)
routerCart.get("/getcartbyid/:id", passport.authenticate("bearer", { session: false }), cartController.getCartById)

module.exports = routerCart;