const express = require('express');
const session = require('express-session');
const { createServer } = require('http');
const { Server } = require('socket.io');

const messagesRouter = require('./routes/web/messages.router');
const productosTestRouter = require('./routes/web/productos.test.router');
const productosRouter = require('./routes/api/productos.router');
const webServerRouter = require('./routes/web/webserver.router');
const authWebRouter = require('./routes/web/auth.webserver.router');

const socketIo = require('./socket/index');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.use(express.static(__dirname + '/public'));

app.use(session({    
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const onConnection = socket => {
    socketIo(io, socket);
}

io.on('connection', onConnection);

app.use('/api/productos', productosRouter);

app.use('/api/productos-test', productosTestRouter);

app.use('/messages', messagesRouter);

app.use(webServerRouter);

app.use(authWebRouter);

module.exports = httpServer;