const { Router } = require('express');
const {
    getProductosTest,
} = require('../../controllers/web/productos.test.controller');

const productosTestRouter = Router();

productosTestRouter.get('/', getProductosTest);

module.exports = productosTestRouter;
