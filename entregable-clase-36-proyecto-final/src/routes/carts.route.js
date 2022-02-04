const { Router } = require('express');

const {
    cartsGet,
    cartsGetByUserId,
    cartsPost,
    cartsDelete,
    cartsGetProducts,
    cartsPostProducts,
    cartsDeleteProducts,
} = require('../controllers/carts.controller');

const router = Router();

router.get('/', cartsGet);

router.get('/user/:userId', cartsGetByUserId);

router.post('/', cartsPost);

router.delete('/:id', cartsDelete);

router.get('/:id/productos', cartsGetProducts);

router.post('/:id/productos', cartsPostProducts);

router.delete('/:id/productos/:id_product', cartsDeleteProducts);

module.exports = router;
