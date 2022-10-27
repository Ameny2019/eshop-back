const passport = require("passport");
const routeStock = require("express").Router();
const stockController = require("../Controllers/stockController")

routeStock.post("/createStock", passport.authenticate("bearer", { session: false }), stockController.CreateStock);
routeStock.get("/GetAllStock", passport.authenticate("bearer", { session: false }), stockController.GetAllStock);
routeStock.get("/GetStockByID/:id", passport.authenticate("bearer", { session: false }), stockController.GetStockByID);
routeStock.put("/UpdateStock/:id", passport.authenticate("bearer", { session: false }), stockController.UpdateStock);
routeStock.delete("/DeleteStock/:id", passport.authenticate("bearer", { session: false }), stockController.DeleteStock);

module.exports = routeStock