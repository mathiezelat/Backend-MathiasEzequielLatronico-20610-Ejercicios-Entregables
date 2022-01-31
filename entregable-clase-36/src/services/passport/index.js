const passport = require('passport');

const { 
    loginStrategy,
    signupStrategy,
    serializeUser,
    deserializeUser
} = require('./localStrategy');

passport.use('signup', signupStrategy);

passport.use('login', loginStrategy);

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

module.exports = passport;