const { carritoDao } = require('../daos/index');
const { productosDao } = require('../daos/index');

const cartsGet = async (req, res, next) => {
    try {
        const carrito = await carritoDao.getAllCarritos();

        res.status(200).json(carrito);
    } catch (error) {
        next(error);
    }
};

const cartsGetByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const carrito = await carritoDao.getCarritoByUserId(userId);

        res.status(200).json(carrito);
    } catch (error) {
        next(error);
    }
};

const cartsPost = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const carrito = await carritoDao.createCarrito(userId);

        res.status(201).json(carrito);
    } catch (error) {
        next(error);
    }
};

const cartsDelete = async (req, res, next) => {
    try {
        const { id } = req.params;

        const carrito = await carritoDao.deleteCarrito(id);

        res.status(200).json(carrito);
    } catch (error) {
        next(error);
    }
};

const cartsGetProducts = async (req, res, next) => {
    try {
        const { id } = req.params;

        const carrito = await carritoDao.getCarritoProductos(id);

        res.status(200).json(carrito);
    } catch (error) {
        next(error);
    }
};

const cartsPostProducts = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { productos } = req.body;

        if (!Object.keys(req.body).length)
            return res.status(400).json({
                error: 'no se han enviado productos',
            });

        if (productos?.lenght)
            return res.status(400).json({
                error: 'no se han especificado productos',
            });

        const productosEncontrados = await productosDao.getAllById(productos);

        if (productosEncontrados.error)
            return res
                .status(productosEncontrados.status)
                .json(productosEncontrados);

        const carrito = await carritoDao.addProducto(id, productosEncontrados);

        res.status(201).json(carrito);
    } catch (error) {
        next(error);
    }
};

const cartsDeleteProducts = async (req, res, next) => {
    try {
        const { id, id_product } = req.params;

        const carrito = await carritoDao.deleteProducto(id, id_product);

        res.status(200).json(carrito);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    cartsGet,
    cartsGetByUserId,
    cartsPost,
    cartsDelete,
    cartsGetProducts,
    cartsPostProducts,
    cartsDeleteProducts,
};
