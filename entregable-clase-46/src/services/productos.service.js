const ProductosRepo = require('../repository/productos.repository');
const { validarProducto } = require('../validators/index');

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
        return await productosApi.getById(productId);
    } catch (error) {
        throw new Error('Ocurrio un error al leer un producto por id');
    }
};

const createProduct = async (product) => {
    const { value: result, error } = validarProducto(product);
    if(result) {
        try {
            return await productosApi.create(product);
        } catch (error) {
            throw new Error('Ocurrio un error al crear un producto');
        }
    } else {
        throw error;
    };
};

const updateByIdProduct = async (productId, product) => {
    try {
        return await productosApi.updateById( productId, product );
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
