const passport = require("passport");
const routeUser = require("express").Router();
const userController = require("../Controllers/userController");

routeUser.post("/CreateUser", passport.authenticate("bearer", { session: false }), userController.CreateUser)
routeUser.get("/GetallUsers", passport.authenticate("bearer", { session: false }), userController.GetAllUsers)
routeUser.put("/UpdateUser/:id", passport.authenticate("bearer", { session: false }), userController.UpdateUser)
routeUser.delete("/deleteUser/:id", passport.authenticate("bearer", { session: false }), userController.DeleteUser)
routeUser.get("/GetUserById/:id", passport.authenticate("bearer", { session: false }), userController.GetUserByID)

module.exports = routeUser
