const {
    readAllProducts,
    readByIdProduct,
    createProduct,
    updateByIdProduct,
    deleteByIdProduct,
} = require('../../services/productos.service');

const getProductos = async () => {
    try {
        const productos = await readAllProducts();
        
        return productos;
    } catch (error) {
        return error;
    }
};

const getProducto = async ({id}) => {
    try {
        const producto = await readByIdProduct(id);

        return producto;
    } catch (error) {
        return error;
    }
};

const createProducto = async ({datos}) => {
    try {
        const { title, price, thumbnail } = datos;

        const save = await createProduct({ title, price, thumbnail });

        return save;
    } catch (error) {
        return error;
    }
};

const updateProducto = async ({id, datos}) => {
    try {
        const { title, price, thumbnail } = datos;

        const productoUpdate = await updateByIdProduct(id, {
            title,
            price,
            thumbnail,
        });

        return productoUpdate;
    } catch (error) {
        return error;
    }
};

const deleteProducto = async ({id}) => {
    try {
        const deleteProducto = await deleteByIdProduct(id);

        return deleteProducto;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto,
};
