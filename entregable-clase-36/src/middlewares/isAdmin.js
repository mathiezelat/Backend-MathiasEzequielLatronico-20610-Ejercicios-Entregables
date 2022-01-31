const { ADMIN } = require('../config');

const isAdmin = (req, res, next) => {
    if( ADMIN === 'false' ) return res.status(401).send({ 
        error: -1, 
        descripcion: `ruta '${ req.originalUrl }' método '${ req.method }' no autorizada` 
    });
    next();
}

module.exports = isAdmin;