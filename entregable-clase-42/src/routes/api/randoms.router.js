const { Router } = require('express');

const {
    getRandoms,
    getRandomsHealth,
} = require('../../controllers/api/randoms.controller');

const randomsApiRouter = Router();

randomsApiRouter.get('/', getRandoms);

randomsApiRouter.get('/health', getRandomsHealth);

module.exports = randomsApiRouter;
