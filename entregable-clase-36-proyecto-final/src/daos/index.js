const { STORAGE_TYPE } = require('../config');

const ProductosDaoArchivo = require('./products/products.archive.dao');
const CarritosDaoArchivo = require('./carts/carts.archive.dao');
const UsersDaoArchivo = require('./users/users.archive.dao');
const OrdersDaoArchivo = require('./orders/orders.archive.dao');

const ProductosDaoMemoria = require('./products/products.memory.dao');
const CarritosDaoMemoria = require('./carts/carts.memory.dao');
const UsersDaoMemoria = require('./users/users.memory.dao');
const OrdersDaoMemoria = require('./orders/orders.memory.dao');

const ProductosDaoMongoDB = require('./products/products.mongodb.dao');
const CarritosDaoMongoDB = require('./carts/carts.mongodb.dao');
const UsersDaoMongoDB = require('./users/users.mongodb.dao');
const OrdersDaoMongoDB = require('./orders/orders.mongodb.dao');

const daos = {
    archivo: {
        productosDao: new ProductosDaoArchivo(),
        carritoDao: new CarritosDaoArchivo(),
        usersDao: new UsersDaoArchivo(),
        ordersDao: new OrdersDaoArchivo(),
    },
    memoria: {
        productosDao: new ProductosDaoMemoria(),
        carritoDao: new CarritosDaoMemoria(),
        usersDao: new UsersDaoMemoria(),
        ordersDao: new OrdersDaoMemoria(),
    },
    mongodb: {
        productosDao: new ProductosDaoMongoDB(),
        carritoDao: new CarritosDaoMongoDB(),
        usersDao: new UsersDaoMongoDB(),
        ordersDao: new OrdersDaoMongoDB(),
    },
    default: {
        productosDao: new ProductosDaoMemoria(),
        carritoDao: new CarritosDaoMemoria(),
        usersDao: new UsersDaoMemoria(),
        ordersDao: new OrdersDaoMemoria(),
    },
};

module.exports = daos[STORAGE_TYPE] || daos['default'];
