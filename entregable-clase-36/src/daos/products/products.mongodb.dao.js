const ContenedorMongoDB = require('../../containers/mongodb.container');

const Product = require('../../models/product');

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Product);
    }

    async save(producto) {
        try {
            const response = this.create(producto);

            return response;
        } catch (error) {
            throw {
                ...error,
                description: 'Ocurrio un error al guardar el producto'
            };
        }
    }
}

module.exports = ProductosDaoMongoDB;
