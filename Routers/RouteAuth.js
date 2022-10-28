const routeAuth = require("express").Router();
const authController = require("../Controllers/authController");
const resetController = require("../controllers/forgot_password.controller");
const passport = require("passport");

routeAuth.post("/login", authController.login);
routeAuth.post("/register", authController.register);
routeAuth.get("/account-activation/:code", authController.activationAccount);
routeAuth.get("/logout", passport.authenticate("bearer", { session: false }), authController.logout);
// profile
routeAuth.get("/profile", passport.authenticate("bearer", { session: false }), authController.profile);
// reset & fogot password
routeAuth.post("/forgot-password", resetController.forgetPassword);
routeAuth.post("/reset-password", resetController.resetPassword);


module.exports = routeAuth;