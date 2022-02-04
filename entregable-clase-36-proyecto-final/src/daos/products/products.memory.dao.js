const ContenedorMemoria = require('../../containers/memory.container');

class ProductosDaoMemoria extends ContenedorMemoria {
    constructor() {
        super('productos');

        this.productos = this.data;
    }

    save(producto) {
        try {
            for (const key in producto) {
                if (!producto[key]) {
                    throw {
                        message: `${key} no definida`,
                        status: 400,
                        name: 'Ocurrio un error al guardar el producto',
                    };
                }
            }

            const productos = this.productos;

            if (!productos.length) {
                producto._id = '1';
            } else {
                producto._id = (
                    parseInt(productos[productos.length - 1]._id) + 1
                ).toString();
            }

            producto.codigo = producto._id;

            producto.timestamp = new Date().toLocaleString();

            productos.push(producto);

            this.write(productos);

            return producto;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al guardar el producto',
            };
        }
    }

    getById(id) {
        try {
            const productos = this.read();

            const producto = productos.find((producto) => producto._id === id);

            if (!producto) {
                throw {
                    message: 'Producto no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al obtener el producto por id',
                };
            }

            return producto;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al obtener el producto',
            };
        }
    }

    getAllById(productosId) {
        try {
            const productosEncontrados = [];

            for (const productoId of productosId) {
                if (!productoId) {
                    throw {
                        message: 'Producto no encontrado',
                        status: 404,
                        productoId,
                        name: 'Ocurrio un error al obtener el producto por id',
                    };
                }

                const producto = this.getById(productoId);

                productosEncontrados.push(producto);
            }

            if (!productosEncontrados.length) {
                throw {
                    message: 'Productos no encontrados',
                    status: 404,
                    name: 'Ocurrio un error al obtener los productos',
                };
            }

            return productosEncontrados;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al obtener los productos',
            };
        }
    }

    getAll() {
        try {
            return this.read();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al obtener los productos',
            };
        }
    }

    update(id, productoActualizado) {
        try {
            const productos = this.productos;

            const producto = productos.find((producto) => producto._id === id);

            if (!producto) {
                throw {
                    message: 'Producto no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al actualizar el producto por id',
                };
            }

            const productoIndex = productos.indexOf(producto);

            for (const key in producto) {
                if (productoActualizado[key]) {
                    producto[key] = productoActualizado[key];
                }
            }

            productos[productoIndex] = producto;

            this.write(productos);

            return productos[productoIndex];
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al actualizar el producto',
            };
        }
    }

    deleteById(id) {
        try {
            const productos = this.productos;

            const producto = productos.find((producto) => producto._id === id);

            if (!producto) {
                throw {
                    message: 'Producto no encontrado',
                    status: 404,
                    id,
                    name: 'Ocurrio un error al actualizar el producto por id',
                };
            }

            productos.splice(productos.indexOf(producto), 1);

            this.write(productos);

            return producto;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al eliminar el producto',
            };
        }
    }

    deleteAll() {
        try {
            this.productos = [];

            this.write(this.productos);
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al eliminar todos los productos',
            };
        }
    }
}

module.exports = ProductosDaoMemoria;
