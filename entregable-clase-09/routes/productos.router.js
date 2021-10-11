const { Router } = require('express')
const Contenedor = require('../models/Contenedor');

const miContenedor = new Contenedor('productos.json');

const productosRouter = Router();

productosRouter.get('/', async (req, res) => {
    const productos = await miContenedor.getAll();

    res.json( productos );
});

productosRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const producto = await miContenedor.getById(id);

    if (producto.error) return res.status(producto.status).json( producto )
    else res.json( producto );
});

productosRouter.post('/', async (req, res) => {
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
    else res.json( save );
});

productosRouter.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const { 
        title, 
        price, 
        thumbnail } = req.body;
    
    const producto = {
        title, 
        price, 
        thumbnail
    }

    const productoUpdate = await miContenedor.update(id, producto);

    if (productoUpdate.error) return res.status(productoUpdate.status).json( productoUpdate )
    else res.json( productoUpdate );
});

productosRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const deleteProducto = await miContenedor.deleteById(id);

    if( deleteProducto.error ) res.status(deleteProducto.status).json( deleteProducto );
    else res.json( deleteProducto );
});

module.exports = productosRouter;