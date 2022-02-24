const { Router } = require('express');
const passport = require('passport');

const {
    getHome,
    getLogin,
    getSignup,
    getFailLogin,
    getFailSignup,
    getLogout,
} = require('../../controllers/web/auth.webserver.controller');

const { isAuthWeb, isUserLogged } = require('../../utils/auth');

const authWebRouter = Router();

authWebRouter.get('/', isUserLogged, getHome);

authWebRouter.get('/login', isUserLogged, getLogin);

authWebRouter.get('/signup', isUserLogged, getSignup);

authWebRouter.get('/faillogin', isUserLogged, getFailLogin);

authWebRouter.get('/failsignup', isUserLogged, getFailSignup);

authWebRouter.post(
    '/login',
    passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/faillogin',
    }),
);

authWebRouter.post(
    '/signup',
    passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/failsignup',
    }),
);

authWebRouter.get('/logout', isAuthWeb, getLogout);

module.exports = authWebRouter;
