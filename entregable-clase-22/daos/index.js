const ProductosSQL = require('./productos/ProductosSQL')
const MessagesMongoDB = require('./messages/MessagesMongoDB');


const DAO = {
    ProductosDao: ProductosSQL,
    MessagesDao: MessagesMongoDB
}

module.exports = DAO;

