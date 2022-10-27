const routeAuth = require("express").Router();
const authController = require("../Controllers/authController");

routeAuth.post("/register", authController.register);
routeAuth.post("/login", authController.login);
routeAuth.get("/account-activation/:code", authController.activationAccount);
routeAuth.get("/logout", authController.logout);
// routeAuth.get("/resetPassword", authController.resetPassword);

module.exports = routeAuth;