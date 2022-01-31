const { Router } = require('express');

const {
    ordersGet,
    ordersPost,
} = require('../controllers/orders.controller');

const router = Router();

router.get('/', ordersGet);
router.post('/', ordersPost);

module.exports = router;