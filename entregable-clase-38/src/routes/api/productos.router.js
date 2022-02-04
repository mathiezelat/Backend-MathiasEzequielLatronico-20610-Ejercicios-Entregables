const { Router } = require('express');

const {
    getProductos,
    getProductosById,
    postProductos,
    putProductos,
    deleteProductos,
} = require('../../controllers/api/productos.controller');

const productosRouter = Router();

productosRouter.get('/', getProductos);

productosRouter.get('/:id', getProductosById);

productosRouter.post('/', postProductos);

productosRouter.put('/:id', putProductos);

productosRouter.delete('/:id', deleteProductos);

module.exports = productosRouter;
