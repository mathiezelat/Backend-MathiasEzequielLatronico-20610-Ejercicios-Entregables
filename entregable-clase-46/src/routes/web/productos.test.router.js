const Router = require('koa-router');

const {
    getProductosTest,
} = require('../../controllers/web/productos.test.controller');

const router = new Router({
    prefix: '/api/productos-test'
});

router.get('/', getProductosTest);

module.exports = router;
