const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const { PORT, MODE_SERVER } = require('./config');
const logger = require('./logger/winston');
const app = require('./server');

const isCluster = MODE_SERVER.toUpperCase() === 'CLUSTER';

if (cluster.isMaster && isCluster) {
    logger.info(`CLUSTER MASTER INIT - PID ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        logger.info(
            `Worker ${
                worker.process.pid
            } ha terminado - ${new Date().toLocaleString()}`,
        );
        cluster.fork();
    });
} else {
    const server = app.listen(PORT, () =>
        logger.info(
            `Servidor abierto en http://localhost:${
                server.address().port
            }/ - PID: ${process.pid}`,
        ),
    );

    server.on('error', (error) => {
        logger.error(`Error en el servidor: ${error}`);
    });
}
