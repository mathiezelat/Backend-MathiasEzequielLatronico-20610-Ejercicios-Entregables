// const ProductosSQL = require('./productos/ProductosSQL')
const ProductosMongoDB = require('./productos/ProductosMongoDB');
const MessagesMongoDB = require('./messages/MessagesMongoDB');
const UsersMongoDB = require('./users/UsersMongoDB');

const DAO = {
    productosDao: new ProductosMongoDB(),
    messagesDao: new MessagesMongoDB(),
    usersDao: new UsersMongoDB(),
};

module.exports = DAO;
