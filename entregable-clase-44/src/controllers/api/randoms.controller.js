const { randomsNumbers } = require('../../services/randoms.service');

const getRandoms = (req, res) => {
    const { cant } = req.query;

    res.json(randomsNumbers(cant));
};

const getRandomsHealth = (req, res) => {
    res.json({ date: new Date().toLocaleString() });
};

module.exports = {
    getRandoms,
    getRandomsHealth,
};
