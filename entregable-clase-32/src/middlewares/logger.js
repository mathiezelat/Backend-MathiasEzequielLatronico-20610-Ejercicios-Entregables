const logger = require('../logger/index');

const loggerPathAndMethod = (req, res, next) => {
    logger.info(`RUTA: ${req.path} - MÉTODO: ${req.method} - RECIBIDO`);
    next();
}

const loggerPathAndMethodNonExistent = (req, res, next) => {
    logger.warn(`RUTA: ${req.path} - MÉTODO: ${req.method} - RUTA INEXISTENTE`);
    next();
}

module.exports = {
    loggerPathAndMethod,
    loggerPathAndMethodNonExistent
};