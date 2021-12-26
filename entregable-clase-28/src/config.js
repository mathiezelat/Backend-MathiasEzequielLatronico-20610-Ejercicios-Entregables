require('dotenv').config();

const yargs = require('yargs/yargs')(process.argv.slice(2));

const argv = yargs
                .alias({
                    p: 'port'
                })
                .default({
                    port: 8080
                })
                .argv;

const options = {
    MONGODB: {
        host: process.env.MONGODB_HOST || 'mongodb://localhost/ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    SECRET_SESSION: process.env.SECRET_SESSION,
    PORT: argv.port
}

module.exports = options;