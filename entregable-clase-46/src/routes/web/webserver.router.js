const Router = require('koa-router');

const {
    getWebHome,
    postWebProductos,
    getWebVista,
    getWebInfo,
} = require('../../controllers/web/webserver.controller');

const { isAuthWeb } = require('../../utils/auth');

const router = new Router();

router.get('/home', isAuthWeb, getWebHome);

router.post('/productos', postWebProductos);

router.get('/vista', isAuthWeb, getWebVista);

router.get('/info', getWebInfo);

module.exports = router;
