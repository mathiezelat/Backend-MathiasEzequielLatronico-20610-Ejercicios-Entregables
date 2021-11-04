const { Router } = require('express');

const { saveProduct, getAllProducts } = require('../models/Products');

const productosWebServerRouter = Router();

productosWebServerRouter.get('/', (req, res) => {
    res.render( 'pages/index' );
});

productosWebServerRouter.post('/', async (req, res) => {
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
    else res.redirect( '/productos' );
});

productosWebServerRouter.get('/vista', async (req, res) => {
    const productos = await getAllProducts();

    res.render( 'pages/vista', { productos } );
});

module.exports = productosWebServerRouter;