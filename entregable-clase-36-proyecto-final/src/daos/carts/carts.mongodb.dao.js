const ContenedorMongoDB = require('../../containers/mongodb.container');

const Cart = require('../../models/cart');

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Cart);
    }

    async createCarrito(userId) {
        try {
            const carrito = {
                productos: [],
                userId
            };

            const response = await this.create(carrito);

            return response;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al crear un nuevo carrito',
            };
        }
    }

    async getAllCarritos() {
        try {
            return await this.getAll();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer los carritos',
            };
        }
    }

    async getCarritoByUserId(userId) {
        try {
            return await this.getByUserId(userId);
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer los carritos',
            };
        }
    }


    async getCarritoProductos(id) {
        try {
            const carrito = await this.getById(id);

            return carrito.productos;
        } catch (error) {
            throw {
                ...error,
                description:
                    'Ocurrio un error al obtener los productos del carrito',
            };
        }
    }

    async addProducto(id, productos) {
        try {
            const carritoProductos = await this.getCarritoProductos(id);

            for (const producto of productos) {
                carritoProductos.push(producto);
            }

            const response = await this.update(id, {
                productos: carritoProductos,
            });

            return response;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al agregar un producto',
            };
        }
    }

    async deleteProducto(id, productoId) {
        try {
            const carritoProductos = await this.getCarritoProductos(id);

            const producto = carritoProductos.find(
                (producto) => producto._id.toString() === productoId,
            );

            if (!producto) {
                throw {
                    message: 'Producto no encontrado',
                    status: 404,
                    id: productoId,
                    name: 'Ocurrio un error al borrar por id',
                };
            }

            carritoProductos.splice(carritoProductos.indexOf(producto), 1);

            const response = await this.update(id, {
                productos: carritoProductos,
            });

            return response;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al borrar un producto',
            };
        }
    }

    async deleteCarrito(id) {
        try {
            const response = await this.deleteById(id);

            return response;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al borrar un carrito',
            };
        }
    }
}

module.exports = CarritosDaoMongoDB;
