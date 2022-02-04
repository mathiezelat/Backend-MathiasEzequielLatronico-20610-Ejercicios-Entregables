
// const { getAllProducts, saveProduct } = require('../daos/productos/ProductosSQL');

const { messagesDao, productosDao } = require('./../daos/index');
const { normalizeMessages } = require('./../utils/normalize');

module.exports = async (io, socket) => {
    console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);
    
    // messages
    const messages = await messagesDao.readAll();

    const messagesNormalized = normalizeMessages(messages);

    socket.emit('messages', messagesNormalized);

    socket.on('new-message', async data => {
        await messagesDao.create(data);

        const messages = await messagesDao.readAll();

        const messagesNormalized = normalizeMessages(messages);

        io.sockets.emit('messages', messagesNormalized);
    });

    // Agregar producto
    const products = await productosDao.readAll();
    socket.emit('products', products);

    socket.on('new-product',async product => {
        
        await productosDao.create(product);

        const products = await productosDao.readAll();

        io.sockets.emit('products', products);
    });

}