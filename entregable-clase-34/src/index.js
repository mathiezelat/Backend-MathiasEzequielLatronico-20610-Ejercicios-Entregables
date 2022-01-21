const httpServer = require('./server');
const cluster = require('cluster');

const numCPUs = require('os').cpus().length;

const { PORT, MODE_SERVER = '' } = require('./config');

const isCluster = MODE_SERVER.toUpperCase() === 'CLUSTER';

if (cluster.isMaster && isCluster) {
    console.log(`Procesadores: ${numCPUs}`);
    console.log(`CLUSTER MASTER INIT - PID ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(
            `Worker ${
                worker.process.pid
            } ha terminado - ${new Date().toLocaleString()}`,
        );
        cluster.fork();
    });
} else {
    const server = httpServer.listen(PORT, () =>
        console.log(
            `Servidor abierto en http://localhost:${PORT}/ - PID: ${process.pid}`,
        ),
    );

    server.on('error', (error) => console.log('Error en servidor:', error));
}
