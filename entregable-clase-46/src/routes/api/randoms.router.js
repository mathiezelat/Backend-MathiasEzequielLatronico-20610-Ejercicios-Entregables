const Router = require('koa-router');

const {
    getRandoms,
    getRandomsHealth,
} = require('../../controllers/api/randoms.controller');

const router = new Router({
    prefix: '/api/randoms'
});

router.get('/', getRandoms);

router.get('/health', getRandomsHealth);

module.exports = router;
