const ProductosRepo = require('../repository/productos.repository');

const productosApi = new ProductosRepo();

const readAllProducts = async () => {
    try {
        return await productosApi.getAll();
    } catch (error) {
        throw new Error('Ocurrio un error al leer todos los productos');
    }
};

const readByIdProduct = async (productId) => {
    try {
        return await productosApi.readById(productId);
    } catch (error) {
        throw new Error('Ocurrio un error al leer un producto por id');
    }
};

const createProduct = async (product) => {
    try {
        return await productosApi.create(product);
    } catch (error) {
        throw new Error('Ocurrio un error al crear un producto');
    }
};

const updateByIdProduct = async (productId, product) => {
    try {
        return await productosApi.updateById({ productId, product });
    } catch (error) {
        throw new Error('Ocurrio un error al actualizar un producto');
    }
};

const deleteByIdProduct = async (productId) => {
    try {
        return await productosApi.deleteById(productId);
    } catch (error) {
        throw new Error('Ocurrio un error al borrar un producto');
    }
};

module.exports = {
    readAllProducts,
    readByIdProduct,
    createProduct,
    updateByIdProduct,
    deleteByIdProduct,
};
