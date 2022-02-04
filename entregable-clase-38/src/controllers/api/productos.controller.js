const {
    readAllProducts,
    readByIdProduct,
    createProduct,
    updateByIdProduct,
    deleteByIdProduct,
} = require('../../services/productos.service');

const getProductos = async (req, res) => {
    const productos = await readAllProducts();

    res.json(productos);
};

const getProductosById = async (req, res) => {
    const id = req.params.id;

    const producto = await readByIdProduct(Number(id));

    if (producto.error) {
        res.status(producto.status).json(producto);
    } else {
        res.json(producto);
    }
};

const postProductos = async (req, res) => {
    const { title, price, thumbnail } = req.body;

    const save = await createProduct({ title, price, thumbnail });

    if (save.error) {
        res.status(save.status).json(save);
    } else {
        res.json(save);
    }
};

const putProductos = async (req, res) => {
    const id = req.params.id;

    const { title, price, thumbnail } = req.body;

    const productoUpdate = await updateByIdProduct(Number(id), {
        title,
        price,
        thumbnail,
    });

    if (productoUpdate.error) {
        res.status(productoUpdate.status).json(productoUpdate);
    } else {
        res.json(productoUpdate);
    }
};

const deleteProductos = async (req, res) => {
    const id = req.params.id;

    const deleteProducto = await deleteByIdProduct(Number(id));

    if (deleteProducto.error) {
        res.status(deleteProducto.status).json(deleteProducto);
    } else {
        res.json(deleteProducto);
    }
};

module.exports = {
    getProductos,
    getProductosById,
    postProductos,
    putProductos,
    deleteProductos,
};
