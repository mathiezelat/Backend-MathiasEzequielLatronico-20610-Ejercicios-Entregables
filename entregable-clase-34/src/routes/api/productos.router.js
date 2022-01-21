const { Router } = require('express');

const { productosDao } = require('../../daos/index');

const productosRouter = Router();

productosRouter.get('/', async (req, res) => {
    const productos = await productosDao.readAll();

    res.json(productos);
});

productosRouter.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const producto = await productosDao.readById(id);

    if (producto.error) {
        res.status(producto.status).json(producto);
    } else {
        res.json(producto);
    }
});

productosRouter.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body;

    const producto = {
        title,
        price,
        thumbnail,
    };

    const save = await productosDao.create(producto);

    if (save.error) {
        res.status(save.status).json(save);
    } else {
        res.json(save);
    }
});

productosRouter.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const { title, price, thumbnail } = req.body;

    const producto = {
        title,
        price,
        thumbnail,
    };

    const productoUpdate = await productosDao.updateById({id, producto});

    if (productoUpdate.error) {
        res.status(productoUpdate.status).json(productoUpdate);
    } else {
        res.json(productoUpdate);
    }
});

productosRouter.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const deleteProducto = await productosDao.deleteById(id);

    if (deleteProducto.error) {
        res.status(deleteProducto.status).json(deleteProducto);
    } else {
        res.json(deleteProducto);
    }
});

module.exports = productosRouter;
