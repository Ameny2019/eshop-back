const routeCategorie = require("express").Router();
const passport = require("passport");
const categorieController = require("../Controllers/categorieController");

routeCategorie.post("/CreateCategorie", passport.authenticate("bearer", { session: false }), categorieController.CreateCategorie);
routeCategorie.get("/GetAllCategorie", passport.authenticate("bearer", { session: false }), categorieController.GetAllCategorie);
routeCategorie.put("/UpdateCategorie/:id", passport.authenticate("bearer", { session: false }), categorieController.UpdateCategorie);
routeCategorie.delete("/deleteCategorie/:id", passport.authenticate("bearer", { session: false }), categorieController.DeleteCategorie);
routeCategorie.get("/GetCategorieByID/:id", passport.authenticate("bearer", { session: false }), categorieController.GetCategorieByID);

module.exports = routeCategorie