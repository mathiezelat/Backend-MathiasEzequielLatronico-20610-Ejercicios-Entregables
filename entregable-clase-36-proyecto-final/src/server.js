const express = require('express');
const flash = require('express-flash');

const logger = require('./logger/winston');
const passport = require('./services/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(require('./services/session/storage'));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/api/productos', require('./routes/products.route'));

app.use('/api/carritos', require('./routes/carts.route'));

app.use('/api/auth', require('./routes/auth.route'));

app.use('/api/users', require('./routes/users.route'));

app.use('/api/orders', require('./routes/orders.route'));

app.use(require('./routes/webserver.route'));

app.use('*', (req, res) => {
    logger.info(`Info: ruta '${req.originalUrl}' método '${req.method}' no implementada`);
    res.status(404).json({
        error: -2,
        descripcion: `ruta '${req.originalUrl}' método '${req.method}' no implementada`,
    });
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    logger.warn(`Error: ${err}`);
    res.status(status);
    res.json({
        error: err,
        status,
    });
});

module.exports = app;
