const ContenedorArchivo = require('../../containers/archive.container');

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/carritos.json');

        this.carritos = this.readFile();
    }

    async createCarrito(userId) {
        try {
            const carritos = await this.carritos;

            const carrito = {
                _id: 0,
                timestamp: new Date().toLocaleString(),
                productos: [],
                order: false,
                userId,
            };

            if (!carritos.length) {
                carrito._id = '1';
            } else {
                carrito._id = (
                    parseInt(carritos[carritos.length - 1]._id) + 1
                ).toString();
            }

            carritos.push(carrito);

            await this.writeFile(carritos);

            return carrito;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al crear un nuevo carrito',
            };
        }
    }

    async getAllCarritos() {
        try {
            return await this.readFile();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer los carritos',
            };
        }
    }

    async getCarritoByUserId(userId) {
        try {
            const carritos = await this.readFile();

            const carrito = carritos.filter(carrito => carrito.userId === userId && carrito.order === false);

            return carrito;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al leer los carritos',
            };
        }
    }

    async getCarritoProductos(id) {
        try {
            const carritos = await this.readFile();

            const carrito = carritos.find((carrito) => carrito._id === id);

            if (!carrito) {
                throw {
                    message: 'Carrito no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al obtener los productos del carrito por id',
                };
            }

            return carrito.productos;
        } catch (error) {
            throw {
                ...error,
                description:
                    'Ocurrio un error al obtener los productos del carrito',
            };
        }
    }

    async update(id, carritoActualizado) {
        try {
            const carritos = await this.carritos;

            const carrito = carritos.find((carrito) => carrito._id === id);

            if (!carrito) {
                throw {
                    message: 'Carrito no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al actualizar por id',
                };
            }

            const carritoIndex = carritos.indexOf(carrito);

            const validateAllProp = Object.values(carritoActualizado).every(
                (value) => value === undefined,
            );

            if (validateAllProp) {
                throw {
                    message:
                        'No se recibio ninguna propiedad para actualizar el carrito',
                    status: 400,
                    id,
                    name: 'Ocurrio un error al borrar por id',
                };
            }

            for (const key in carrito) {
                if (carritoActualizado[key]) {
                    carrito[key] = carritoActualizado[key];
                }
            }

            carritos[carritoIndex] = carrito;

            await this.writeFile(carritos);

            return carritos[carritoIndex];
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al actualizar el carrito',
            };
        }
    }

    async deleteCarrito(id) {
        try {
            const carritos = await this.carritos;

            const carrito = carritos.find((carrito) => carrito._id === id);

            if (!carrito) {
                throw {
                    message: 'Carrito no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al borrar por id',
                };
            }

            carritos.splice(carritos.indexOf(carrito), 1);

            await this.writeFile(carritos);

            return carrito;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al borrar un carrito',
            };
        }
    }

    async addProducto(id, productos) {
        try {
            const carritos = await this.carritos;

            const carrito = carritos.find((carrito) => carrito._id === id);

            if (!carrito) {
                throw {
                    message: 'Carrito no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al agregar producto por id',
                };
            }

            for (const producto of productos) {
                carrito.productos.push(producto);
            }

            await this.writeFile(carritos);

            return carrito;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al agregar un producto',
            };
        }
    }

    async deleteProducto(id, productoId) {
        try {
            const carritos = await this.carritos;

            const carrito = carritos.find((carrito) => carrito._id === id);

            if (!carrito) {
                throw {
                    message: 'Carrito no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al eliminar un producto por id',
                };
            }

            const producto = carrito.productos.find(
                (producto) => producto._id === productoId,
            );

            if (!producto) {
                throw {
                    message: 'Producto no encontrado',
                    status: 404,
                    id: productoId,
                    name: 'Ocurrio un error al eliminar un producto por id',
                };
            }

            carrito.productos.splice(carrito.productos.indexOf(producto), 1);

            await this.writeFile(carritos);

            return carrito;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al borrar un producto',
            };
        }
    }
}

module.exports = CarritosDaoArchivo;
