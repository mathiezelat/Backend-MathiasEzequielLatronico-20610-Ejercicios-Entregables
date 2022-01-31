const session = require('express-session');
const MongoStore = require('connect-mongo');

const { SECRET_SESSION, MONGODB_CNN } = require('../../config');

const sessionStorage = session({
    store: MongoStore.create({
        mongoUrl: MONGODB_CNN,
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: SECRET_SESSION,
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
        secure: false,
        httpOnly: false,
        sameSite: true
    },
    rolling: true,
});

module.exports = sessionStorage;