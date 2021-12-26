const httpServer = require('./server');

const config = require('./config');

const port = config.PORT;

const server = httpServer.listen(port, () => 
    console.log(`Servidor abierto en http://localhost:${port}/`)
)

server.on('error', error => console.log('Error en servidor:', error));