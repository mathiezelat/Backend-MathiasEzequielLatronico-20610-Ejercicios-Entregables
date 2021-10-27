const { Router } = require('express');

const Carrito = require('../models/Carrito');

const miCarrito = new Carrito('carritos.json');

const carritoRouter = Router();

carritoRouter.post('/', async (req, res) => {
    try {

        const carrito = await miCarrito.createCarrito()

        res.status(201).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.delete('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const carrito = await miCarrito.deleteCarrito( parseInt(id) );

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(200).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.get('/:id/productos', async (req, res) => {
    try {

        const { id } = req.params;

        const carrito = await miCarrito.getCarritoProductos( parseInt(id) )

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(200).json( carrito );

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.post('/:id/productos/:id_product', async (req, res) => {
    try {

        const { id, id_product } = req.params;

        const carrito = await miCarrito.addProducto(parseInt(id), parseInt(id_product))

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(201).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

carritoRouter.delete('/:id/productos/:id_product', async (req, res) => {
    try {

        const { id, id_product } = req.params;

        const carrito = await miCarrito.deleteProducto(parseInt(id), parseInt(id_product))

        if (carrito.error) return res.status( carrito.status ).json( carrito );
        else res.status(200).json(carrito);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


module.exports = carritoRouter;