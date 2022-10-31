const upload = require("../middelwares/upload");
const routeEfleur = require("express").Router();
const passport = require("passport");
const EfleurController = require("../Controllers/efleurController");

routeEfleur.post("/createEfleur", [passport.authenticate("bearer", { session: false }), upload.single("photo")], EfleurController.CreatEfleur);
routeEfleur.get("/GetAllEfleur", passport.authenticate("bearer", { session: false }), EfleurController.GetAllEfleur);
routeEfleur.get("/GetEfleurByID/:id", passport.authenticate("bearer", { session: false }), EfleurController.GetEfleurByID);
routeEfleur.put("/UpdateEfleur/:id", [passport.authenticate("bearer", { session: false }), upload.single("photo")], EfleurController.UpdateEfleur);
routeEfleur.delete("/DeleteEfleur/:id", passport.authenticate("bearer", { session: false }), EfleurController.DeleteEfleur);
routeEfleur.get("/updateEtat/:id", passport.authenticate("bearer", { session: false }), EfleurController.UpdateEtaProductEfleur)
routeEfleur.get("/getOuiEtatProductEfleur", passport.authenticate("bearer", { session: false }), EfleurController.GetEfleurEtatOui)
routeEfleur.get("/getNonEtatProductEfleur", passport.authenticate("bearer", { session: false }), EfleurController.GetEfleurEtatNon)


module.exports = routeEfleur