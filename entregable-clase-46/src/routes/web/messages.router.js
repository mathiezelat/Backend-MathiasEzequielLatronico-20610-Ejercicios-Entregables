const Router = require('koa-router');

const { getMessagesHome } = require('../../controllers/web/messages.controller');

const router = new Router({
    prefix: '/messages'
});

router.get('/', getMessagesHome)

module.exports = router;