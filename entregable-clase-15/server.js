const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const productosRouter = require('./routes/productos.router');
const productosWebServerRouter = require('./routes/productos.webserver.router');
const socketIo = require('./socket/index');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );

app.use( express.static('public') );

app.set('view engine', 'ejs');

const onConnection = socket => {
    socketIo(io, socket);
}

io.on('connection', onConnection);

app.use('/api/productos', productosRouter);

app.use('/productos', productosWebServerRouter);

module.exports = httpServer;