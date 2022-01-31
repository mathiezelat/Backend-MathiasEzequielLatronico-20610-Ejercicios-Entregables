const { productosDao } = require('../daos/index');

const productsGet = async (req, res, next) => {
    try {
        const productos = await productosDao.getAll();
        res.status(200).json(productos);
    } catch (error) {
        next(error);
    }
};

const productsGetById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const producto = await productosDao.getById(id);

        res.status(200).json(producto);
    } catch (error) {
        next(error);
    }
};

const productsPost = async (req, res, next) => {
    try {
        const { nombre, descripcion, foto, precio, stock } = req.body;

        if (!Object.keys(req.body).length)
            return res.status(400).json({
                error: 'No se han enviado parametros para actualizar',
            });

        const save = await productosDao.save({
            nombre,
            descripcion,
            foto,
            precio,
            stock,
        });

        res.status(201).json(save);
    } catch (error) {
        next(error);
    }
};

const productsPut = async (req, res, next) => {
    try {
        const id = req.params.id;

        const { nombre, descripcion, foto, precio, stock } = req.body;

        if (!Object.keys(req.body).length)
            return res.status(400).json({
                error: 'No se ha enviado producto',
            });

        const productoUpdate = await productosDao.update(id, {
            nombre,
            descripcion,
            foto,
            precio,
            stock,
        });

        res.status(200).json(productoUpdate);
    } catch (error) {
        next(error);
    }
};

const productsDelete = async (req, res, next) => {
    try {
        const id = req.params.id;

        const deleteProducto = await productosDao.deleteById(id);

        res.status(200).json(deleteProducto);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    productsGet,
    productsGetById,
    productsPost,
    productsPut,
    productsDelete,
};
