require('dotenv').config();

const yargs = require('yargs/yargs')(process.argv.slice(2));

const argv = yargs
    .alias({
        p: 'port',
        m: 'mode',
    })
    .default({
        port: 8080,
        mode: 'FORK',
    }).argv;

const options = {
    MONGODB: {
        host: process.env.MONGODB_CNN || 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    SECRET_SESSION: process.env.SECRET_SESSION,
    PORT: process.env.PORT || argv.port,
    MODE_SERVER: argv.mode,
};

module.exports = options;
