const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const productosRouter = require('./routes/productos.router');
const productosWebServerRouter = require('./routes/productos.webserver.router');
const Contenedor = require('./models/Contenedor');
const { getMessages, saveMessages } = require('./models/Messages');

const miContenedor = new Contenedor('productos.json');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );

app.use( express.static('public') );

app.set('view engine', 'ejs');

const port = 8080;

io.on('connection', async socket => {
    console.log(`¡Nuevo cliente conectado! socketid: ${socket.id}`);

    // Messages
    const messages = await getMessages();
    socket.emit('messages', messages);

    socket.on('new-message', async data => {
        data.fyh = new Date().toLocaleString();

        await saveMessages(data);

        const messages = await getMessages();
        io.sockets.emit('messages', messages);
    });

    // Agregar producto
    const products = await miContenedor.getAll();
    socket.emit('products', products);

    socket.on('new-product',async product => {
        
        await miContenedor.save(product);

        const products = await miContenedor.getAll();

        io.sockets.emit('products', products);
    });

});

app.use('/api/productos', productosRouter);

app.use('/productos', productosWebServerRouter);


const server = httpServer.listen(port, () => 
    console.log(`Servidor abierto en http://localhost:${port}/`)
)

server.on('error', error => console.log('Error en servidor:', error));