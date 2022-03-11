const logger = require('../logger/index');

const loggerPathAndMethod = async (ctx, next) => {
    logger.info(`RUTA: ${ctx.path} - MÉTODO: ${ctx.method} - RECIBIDO`);
    return await next();
}

const loggerPathAndMethodNonExistent = async (ctx, next) => {
    logger.warn(`RUTA: ${ctx.path} - MÉTODO: ${ctx.method} - RUTA INEXISTENTE`);
    ctx.response.status = 404;
    ctx.body = {
        status: 404,
        messagge: `RUTA: ${ctx.path} - MÉTODO: ${ctx.method} - RUTA INEXISTENTE`
    };
}

module.exports = {
    loggerPathAndMethod,
    loggerPathAndMethodNonExistent
};