const { Router } = require('express');

const isAdmin = require('../middlewares/isAdmin');

const {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete,
} = require('../controllers/products.controller');

const router = Router();

router.get('/', productsGet);

router.get('/:id', productsGetById);

router.post('/', isAdmin, productsPost);

router.put('/:id', isAdmin, productsPut);

router.delete('/:id', isAdmin, productsDelete);

module.exports = router;
