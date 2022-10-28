const routeHome = require("express").Router();
const homeController = require("../Controllers/homeController");

routeHome.get("/products", homeController.getProducts);

module.exports = routeHome;