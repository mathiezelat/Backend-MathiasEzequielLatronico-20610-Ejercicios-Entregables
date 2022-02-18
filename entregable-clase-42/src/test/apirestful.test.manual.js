const axios = require('axios');
const logger = require('../logger');

(async () => {
    try {
        logger.info('Test manual iniciado.');
        const productos = await axios.get(
            'http://localhost:8080/api/productos',
        );
        logger.info(`obtener productos status: ${productos.status}`);
        logger.info(productos.data);

        const nuevoProducto = {
            title: 'Esto es un producto de test',
            price: 1500,
            thumbnail:
                'https://www.int.com.ar/wp-content/uploads/2021/12/categorias_de_producto.png',
        };
        const agregarProducto = await axios.post(
            'http://localhost:8080/api/productos',
            nuevoProducto,
        );
        logger.info(`agregar producto status: ${agregarProducto.status}`);
        logger.info(agregarProducto.data);

        const modProducto = {
            price: 12000,
        };
        const modificarProducto = await axios.put(
            `http://localhost:8080/api/productos/${agregarProducto.data._id}`,
            modProducto,
        );
        logger.info(`modificar producto status: ${modificarProducto.status}`);
        logger.info(modificarProducto.data);

        const borrarProducto = await axios.delete(
            `http://localhost:8080/api/productos/${agregarProducto.data._id}`,
        );
        logger.info(`borrar producto status: ${borrarProducto.status}`);
        logger.info(borrarProducto.data);
        logger.info('Test manual terminado.');
    } catch (error) {
        logger.error(error);
    }
})();
