const { randomsNumbers } = require('../../services/randoms.service');

const getRandoms = async (ctx) => {
    const { cant } = ctx.query;

    ctx.body = await randomsNumbers(cant);
};

const getRandomsHealth = (ctx) => {
    ctx.body = { date: new Date().toLocaleString() };
};

module.exports = {
    getRandoms,
    getRandomsHealth,
};
