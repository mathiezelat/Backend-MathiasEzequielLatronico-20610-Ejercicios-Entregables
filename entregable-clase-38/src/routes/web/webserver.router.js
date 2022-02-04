const { Router } = require('express');

const {
    getWebHome,
    postWebProductos,
    getWebVista,
    getWebInfo,
} = require('../../controllers/web/webserver.controller');

const { isAuthWeb } = require('../../utils/auth');

const webServerRouter = Router();

webServerRouter.get('/home', isAuthWeb, getWebHome);

webServerRouter.post('/productos', postWebProductos);

webServerRouter.get('/vista', isAuthWeb, getWebVista);

webServerRouter.get('/info', getWebInfo);

module.exports = webServerRouter;
