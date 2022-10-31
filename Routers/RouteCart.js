const routerCart = require("express").Router();
const passport = require("passport");
const cartController = require("../Controllers/cartController");

routerCart.get("/getCarts", passport.authenticate("bearer", { session: false }), cartController.getCarts);
routerCart.delete("/deleteCart/:id", passport.authenticate("bearer", { session: false }), cartController.deleteCart);
routerCart.get("/getCartById/:id", passport.authenticate("bearer", { session: false }), cartController.getCartById)

routerCart.post("/addItem", passport.authenticate("bearer", { session: false }), cartController.addItemToCart);
routerCart.post("/createCart", passport.authenticate("bearer", { session: false }), cartController.createCart);
routerCart.delete("/removeSingleProduct/:id", passport.authenticate("bearer", { session: false }), cartController.removeSingleProduct)
routerCart.put("/updateCart/:id", passport.authenticate("bearer", { session: false }), cartController.updateCart)

module.exports = routerCart;