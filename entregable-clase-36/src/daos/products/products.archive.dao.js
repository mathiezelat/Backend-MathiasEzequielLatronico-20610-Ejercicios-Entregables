const ContenedorArchivo = require('../../containers/archive.container');

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor() {
        super('DB/productos.json');

        this.productos = this.readFile();
    }

    async save(producto) {
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

            const productos = await this.productos;

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

            await this.writeFile(productos);

            return producto;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al guardar el producto',
            };
        }
    }

    async getById(id) {
        try {
            const productos = await this.readFile();

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

    async getAllById(productosId) {
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

                const producto = await this.getById(productoId);

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

    async getAll() {
        try {
            return await this.readFile();
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al obtener los productos',
            };
        }
    }

    async update(id, productoActualizado) {
        try {
            const productos = await this.productos;

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

            await this.writeFile(productos);

            return productos[productoIndex];
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al actualizar el producto',
            };
        }
    }

    async deleteById(id) {
        try {
            const productos = await this.productos;

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

            await this.writeFile(productos);

            return producto;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al eliminar el producto',
            };
        }
    }

    async deleteAll() {
        try {
            this.productos = [];

            await this.writeFile(this.productos);
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al eliminar todos los productos',
            };
        }
    }
}

module.exports = ProductosDaoArchivo;
