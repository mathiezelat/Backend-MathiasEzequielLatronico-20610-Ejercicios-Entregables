const { Router } = require('express');

const { getMessagesHome } = require('../../controllers/web/messages.controller');

const messagesRouter = Router();

messagesRouter.get('/', getMessagesHome)

module.exports = messagesRouter;