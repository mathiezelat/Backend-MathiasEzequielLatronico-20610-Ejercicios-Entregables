const {
    readAllProducts,
    readByIdProduct,
    createProduct,
    updateByIdProduct,
    deleteByIdProduct,
} = require('../../services/productos.service');

const getProductos = async (req, res) => {
    try {
        const productos = await readAllProducts();
        
        res.json(productos);
    } catch (error) {
        res.status(400).send(error);
    }
};

const getProductosById = async (req, res) => {
    try {
        const id = req.params.id;

        const producto = await readByIdProduct(id);

        if (producto.error) {
            res.status(producto.status).json(producto);
        } else {
            res.json(producto);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

const postProductos = async (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;

        const save = await createProduct({ title, price, thumbnail });

        if (save.error) {
            res.status(save.status).json(save);
        } else {
            res.json(save);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

const putProductos = async (req, res) => {
    try {
        const id = req.params.id;

        const { title, price, thumbnail } = req.body;

        const productoUpdate = await updateByIdProduct(id, {
            title,
            price,
            thumbnail,
        });

        if (productoUpdate.error) {
            res.status(productoUpdate.status).json(productoUpdate);
        } else {
            res.json(productoUpdate);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteProductos = async (req, res) => {
    try {
        const id = req.params.id;

        const deleteProducto = await deleteByIdProduct(id);

        if (deleteProducto.error) {
            res.status(deleteProducto.status).json(deleteProducto);
        } else {
            res.json(deleteProducto);
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    getProductos,
    getProductosById,
    postProductos,
    putProductos,
    deleteProductos,
};
