const passport = require('passport');
const bearerStratigy = require('passport-http-bearer').Strategy;
const User = require('../Models/user');
const jwt = require('jsonwebtoken')

passport.use(
    new bearerStratigy(async (token, done) => {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
            const userFound = await User.findById(decodedToken.userId);
            if (!userFound) {
                return done(null, false);
            } else {
                return done(null, userFound, { scope: "all" });
            }
        } catch (err) {
            console.log(err);
            return done(null, false);
        }
    })
)
