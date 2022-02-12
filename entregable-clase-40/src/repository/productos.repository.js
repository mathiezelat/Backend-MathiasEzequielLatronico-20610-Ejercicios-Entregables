const ProductoDto = require('../DTOs/producto.dto');
const PersistenceFactory = require('../daos/index');
const { PERSISTENCE } = require('../config');

const persistenceFactory = PersistenceFactory.getInstance();

const { productosDao } = persistenceFactory.getPersistenceMethod(PERSISTENCE);

class ProductosRepo {
    constructor() {
        this.dao = productosDao;
    }

    async getAll() {
        try {
            const productos = await productosDao.readAll();
            return productos.map((producto) => {
                const productoDto = new ProductoDto(producto);
                return productoDto;
            });
        } catch (error) {
            throw new Error('Ocurrio un error al leer todos los productos');
        }
    }

    async getById(id) {
        try {
            const producto = await productosDao.readById(id);
            const productoDto = new ProductoDto(producto);
            return productoDto;
        } catch (error) {
            throw new Error('Ocurrio un error al leer un producto por id');
        }
    }

    async create(product) {
        try {
            const producto = await productosDao.create(product);
            const productoDto = new ProductoDto(producto);
            return productoDto;
        } catch (error) {
            throw new Error('Ocurrio un error al crear un producto');
        }
    }

    async updateById(id, product) {
        try {
            const producto = await productosDao.updateById({ id, product });
            const productoDto = new ProductoDto(producto);
            return productoDto;
        } catch (error) {
            throw new Error('Ocurrio un error al actualizar un producto');
        }
    }

    async deleteById(id) {
        try {
            const producto = await productosDao.deleteById(id);
            const productoDto = new ProductoDto(producto);
            return productoDto;
        } catch (error) {
            throw new Error('Ocurrio un error al borrar un producto');
        }
    }
}

module.exports = ProductosRepo;
