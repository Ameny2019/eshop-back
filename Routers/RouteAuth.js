const routeAuth = require("express").Router();
const authController = require("../Controllers/authController");
const resetController = require("../controllers/forgot_password.controller");

routeAuth.post("/login", authController.login);
routeAuth.post("/register", authController.register);
routeAuth.get("/account-activation/:code", authController.activationAccount);
routeAuth.get("/logout", authController.logout);
// reset & fogot password
routeAuth.post("/forgot-password", resetController.forgetPassword);
routeAuth.post("/reset-password", resetController.resetPassword);

module.exports = routeAuth;