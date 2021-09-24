const express = require('express');

const Contenedor = require('./Contenedor');

const app = express();

const miContenedor = new Contenedor('productos.json');

const port = 8080;


app.get('/productos', async (req, res) => {

    const productos = await miContenedor.getAll();

    res.json( productos );

});

app.get('/productoRandom', async (req, res) => {

    const obtenerRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const productos = await miContenedor.getAll();

    const idProductos = productos.map( ({ id }) => id ); 

    const idProductoRandom = idProductos[ obtenerRandom( 0, (idProductos[ idProductos.length - 1 ] - 1) ) ];

    const productoRandom = await miContenedor.getById( idProductoRandom );

    res.json( productoRandom );

});


const server = app.listen(port, () => {
    console.log(`Servidor abierto en http://localhost:${port}/`);
});

server.on('error', error => console.log('Error en servidor:', error));