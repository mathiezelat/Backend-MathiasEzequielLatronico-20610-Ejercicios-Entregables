const { getMessages, saveMessages } = require('../models/Messages');
const { getAllProducts, saveProduct } = require('../models/Products');

module.exports = async (io, socket) => {
    console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);
    
    // Messages
    const messages = await getMessages();
    socket.emit('messages', messages);

    socket.on('new-message', async data => {
        await saveMessages(data);
        const messages = await getMessages();
        io.sockets.emit('messages', messages);
    });

    // Agregar producto
    const products = await getAllProducts();
    socket.emit('products', products);

    socket.on('new-product',async product => {
        
        await saveProduct(product);

        const products = await getAllProducts();

        io.sockets.emit('products', products);
    });
}