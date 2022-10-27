const routerProduct = require("express").Router();
const passport = require("passport");
const productController = require("../Controllers/productController");

routerProduct.post("/createProduct", passport.authenticate("bearer", { session: false }), productController.createProduct);
routerProduct.get("/getProduct", passport.authenticate("bearer", { session: false }), productController.getProducts);
routerProduct.get("/getProductById/:id", passport.authenticate("bearer", { session: false }), productController.getProductById);
routerProduct.delete("/deleteProduct/:id", passport.authenticate("bearer", { session: false }), productController.removeProduct);
routerProduct.put("/updateProduct/:id", passport.authenticate("bearer", { session: false }), productController.UpdateProduct);

module.exports = routerProduct;