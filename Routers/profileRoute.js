const passport = require("passport");
const routeAuth = require("express").Router();
const upload = require("../middelwares/upload");
const profileController = require("../Controllers/profileController");

routeAuth.get("/profile", passport.authenticate("bearer", { session: false }), profileController.getProfile);
routeAuth.put("/profile", [passport.authenticate("bearer", { session: false }), upload.single("image")], profileController.updateUserProfile);

module.exports = routeAuth;