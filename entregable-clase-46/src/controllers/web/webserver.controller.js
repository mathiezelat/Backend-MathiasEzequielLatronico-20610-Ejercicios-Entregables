const {
    readAllProducts,
    createProduct,
} = require('../../services/productos.service');

const numCPUs = require('os').cpus().length;

const getWebHome = async (ctx) => {
    await ctx.render('pages/index', { user: { name: ctx.req.user.email } });
};

const postWebProductos = async (ctx) => {
    const { title, price, thumbnail } = ctx.body;

    const save = await createProduct({ title, price, thumbnail });

    if (save.error) {
        ctx.response.status = save.status;
        ctx.body = save;
    }
    else ctx.redirect('/home');
};

const getWebVista = async (ctx) => {
    const productos = await readAllProducts();

    await ctx.render('pages/vista', { productos });
};

const getWebInfo = async (ctx) => {
    const info = {
        argv: process.argv.slice(2),
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage.rss(),
        executable: process.execPath,
        pid: process.ppid,
        path: process.cwd(),
        cpus: numCPUs,
    };
    await ctx.render('pages/info', { info });
};

module.exports = {
    getWebHome,
    postWebProductos,
    getWebVista,
    getWebInfo,
};
