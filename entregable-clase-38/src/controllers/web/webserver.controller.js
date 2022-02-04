const {
    readAllProducts,
    createProduct,
} = require('../../services/productos.service');

const numCPUs = require('os').cpus().length;

const getWebHome = (req, res) => {
    res.render('pages/index', { user: { name: req.user.email } });
};

const postWebProductos = async (req, res) => {
    const { title, price, thumbnail } = req.body;

    const save = await createProduct({ title, price, thumbnail });

    if (save.error) res.status(save.status).json(save);
    else res.redirect('/home');
};

const getWebVista = async (req, res) => {
    const productos = await readAllProducts();

    res.render('pages/vista', { productos });
};

const getWebInfo = (req, res) => {
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
    // console.log({ info });
    res.render('pages/info', { info });
};

module.exports = {
    getWebHome,
    postWebProductos,
    getWebVista,
    getWebInfo,
};
