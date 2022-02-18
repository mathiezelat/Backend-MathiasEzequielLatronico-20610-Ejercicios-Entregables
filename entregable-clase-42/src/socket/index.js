// const { getAllProducts, saveProduct } = require('../daos/productos/ProductosSQL');

const {
    readAllProducts,
    createProduct,
} = require('../services/productos.service');

const {
    createMessage,
    readAllMessages,
} = require('../services/messages.service');

const { normalizeMessages } = require('./../utils/normalize');

module.exports = async (io, socket) => {
    console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);

    // messages
    const messages = await readAllMessages();

    const messagesNormalized = normalizeMessages(messages);

    socket.emit('messages', messagesNormalized);

    socket.on('new-message', async (data) => {
        await createMessage(data);

        const messages = await readAllMessages();

        const messagesNormalized = normalizeMessages(messages);

        io.sockets.emit('messages', messagesNormalized);
    });

    // Agregar producto
    const products = await readAllProducts();
    socket.emit('products', products);

    socket.on('new-product', async (product) => {
        await createProduct(product);

        const products = await readAllProducts();

        io.sockets.emit('products', products);
    });
};
