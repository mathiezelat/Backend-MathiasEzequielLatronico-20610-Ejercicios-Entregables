const generateProducts = require('../../utils/generateProducts');

const getProductosTest = (req, res) => {
    const productos = generateProducts(5);
    res.render('pages/vista', { productos });
};

module.exports = {
    getProductosTest,
};
