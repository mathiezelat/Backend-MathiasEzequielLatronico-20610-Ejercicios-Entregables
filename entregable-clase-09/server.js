const express = require('express');

const productosRouter = require('./routes/productos.router');

const productosWebServerRouter = require('./routes/productos.webserver.router');

const app = express();

app.use( express.json() );
app.use( express.urlencoded( { extended: true }) );

app.use( express.static('public') );

app.set('view engine', 'ejs');

const port = 8080;


app.use('/api/productos', productosRouter);

app.use('/productos', productosWebServerRouter);


const server = app.listen(port, () => 
    console.log(`Servidor abierto en http://localhost:${port}/`)
)

server.on('error', error => console.log('Error en servidor:', error));