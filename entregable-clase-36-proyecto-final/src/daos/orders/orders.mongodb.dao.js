const ContenedorMongoDB = require('../../containers/mongodb.container');

const Order = require('../../models/order');

class OrdersDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(Order);
    }
}

module.exports = OrdersDaoMongoDB;
