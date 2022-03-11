const generateProducts = require('../../utils/generateProducts');

const getProductosTest = async (ctx) => {
    const productos = generateProducts(5);
    await ctx.render('pages/vista', { productos });
};

module.exports = {
    getProductosTest,
};
