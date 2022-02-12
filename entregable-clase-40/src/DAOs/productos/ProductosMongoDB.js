const ContainerMongoDB = require('../../containers/ContainerMongoDB');

const Product = require('../../models/product');

class ProductsMongoDB extends ContainerMongoDB{

    constructor(){
        super(Product);
    }

}

module.exports = ProductsMongoDB;