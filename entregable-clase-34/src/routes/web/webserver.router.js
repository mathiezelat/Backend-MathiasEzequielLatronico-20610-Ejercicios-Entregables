const { Router } = require('express');

const { productosDao } = require('../../daos/index');

const { isAuthWeb } = require('../../utils/auth');

const numCPUs = require('os').cpus().length;

const webServerRouter = Router();

webServerRouter.get('/home', isAuthWeb, (req, res) => {
    res.render('pages/index', { user: { name: req.user.email } });
});

webServerRouter.post('/productos', async (req, res) => {
    const { title, price, thumbnail } = req.body;

    const producto = {
        title,
        price,
        thumbnail,
    };

    const save = await productosDao.create(producto);

    if (save.error) res.status(save.status).json(save);
    else res.redirect('/home');
});

webServerRouter.get('/vista', isAuthWeb, async (req, res) => {
    const productos = await productosDao.readAll();

    res.render('pages/vista', { productos });
});

webServerRouter.get('/info', (req, res) => {
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
});

module.exports = webServerRouter;
