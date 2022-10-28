const routeHome = require("express").Router();
const homeController = require("../Controllers/homeController");

routeHome.get("/products", homeController.getProducts);
routeHome.get("/products/:id", homeController.getProductDetails);

module.exports = routeHome;