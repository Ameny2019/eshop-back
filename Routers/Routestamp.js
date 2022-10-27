
const routeEstamp = require("express").Router();
const passport = require("passport");
const estampController = require("../Controllers/estampsController");
const upload = require("../middelwares/upload");

routeEstamp.post("/createEstamp", [passport.authenticate("bearer", { session: false }), upload.single("photo")], estampController.CreateStamp);
routeEstamp.get("/GetAllEstamp", passport.authenticate("bearer", { session: false }), estampController.GetAllEstamp);
routeEstamp.get("/GetEstampByID/:id", passport.authenticate("bearer", { session: false }), estampController.GetEstampByID);
routeEstamp.put("/UpdateEstamp/:id", passport.authenticate("bearer", { session: false }), estampController.UpdateEstamp);
routeEstamp.delete("/DeleteEstamp/:id", passport.authenticate("bearer", { session: false }), estampController.DeleteEstamp);
routeEstamp.get("/updateEtat/:id", passport.authenticate("bearer", { session: false }), estampController.UpdateEtaProductEstamp)
routeEstamp.get("/getOuiEtatProductEstamp", passport.authenticate("bearer", { session: false }), estampController.GetEstampEtatOui)
routeEstamp.get("/getNonEtatProductEstamp", passport.authenticate("bearer", { session: false }), estampController.GetEstampEtatNon)


module.exports = routeEstamp