const { Router } = require('express');

const { ProductosDao } = require('../../daos/index');

const { saveProduct, getAllProducts } = ProductosDao;

const { authWeb } = require('../../utils/auth');

const webServerRouter = Router();

webServerRouter.get('/home', authWeb, (req, res) => {
    res.render( 'pages/index', { user: { name: req.session.name } } );
});

webServerRouter.post('/productos', async (req, res) => {
    const { 
        title, 
        price, 
        thumbnail } = req.body;
    
    const producto = {
        title, 
        price, 
        thumbnail
    }

    const save = await saveProduct(producto);

    if( save.error ) res.status(save.status).json( save );
    else res.redirect( '/home' );
});

webServerRouter.get('/vista', authWeb, async (req, res) => {
    const productos = await getAllProducts();

    res.render( 'pages/vista', { productos } );
});

module.exports = webServerRouter;