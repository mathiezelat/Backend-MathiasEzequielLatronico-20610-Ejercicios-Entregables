const Router = require('koa-router');

const passport = require('koa-passport');

const {
    getHome,
    getLogin,
    getSignup,
    getFailLogin,
    getFailSignup,
    getLogout,
} = require('../../controllers/web/auth.webserver.controller');

const { isAuthWeb, isUserLogged } = require('../../utils/auth');

const router = new Router();

router.get('/', isUserLogged, getHome);

router.get('/login', isUserLogged, getLogin);

router.get('/signup', isUserLogged, getSignup);

router.get('/faillogin', isUserLogged, getFailLogin);

router.get('/failsignup', isUserLogged, getFailSignup);

router.post(
    '/login',
    passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/faillogin',
    }),
);

router.post(
    '/signup',
    passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/failsignup',
    }),
);

router.get('/logout', isAuthWeb, getLogout);

module.exports = router;
