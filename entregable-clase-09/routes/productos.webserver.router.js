const { Router } = require('express')
const Contenedor = require('../models/Contenedor');

const miContenedor = new Contenedor('productos.json');

const productosWebServerRouter = Router();

productosWebServerRouter.get('/', async (req, res) => {
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

    const save = await miContenedor.save( producto );

    if( save.error ) res.status(save.status).json( save );
    else res.redirect( '/productos' );
});

productosWebServerRouter.get('/vista', async (req, res) => {
    const productos = await miContenedor.getAll();

    res.render( 'pages/vista', { productos } );
});

module.exports = productosWebServerRouter;