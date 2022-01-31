const { Router } = require('express');

const {
    webServerGetHome,
    webServerGetLogin,
    webServerGetSignup,
    webServerGetFail,
} = require('../controllers/webserver.controller');

const { isUserLogged, isAuthWeb } = require('../utils/auth');

const router = Router();

router.get('/', isAuthWeb, webServerGetHome);

router.get('/signup', isUserLogged, webServerGetSignup);

router.get('/login', isUserLogged, webServerGetLogin);

router.get('/fail', isUserLogged, webServerGetFail);

module.exports = router;
