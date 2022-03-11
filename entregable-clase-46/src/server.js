const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const { createServer } = require('http');
const { Server } = require('socket.io');
const passport = require('koa-passport');
const views = require('koa-views');
const compress = require('koa-compress');
const serve = require('koa-static');
const mount = require('koa-mount');

const messagesRouter = require('./routes/web/messages.router');
const productosTestRouter = require('./routes/web/productos.test.router');
const productosRouter = require('./routes/api/productos.router');
const randomsApiRouter = require('./routes/api/randoms.router');
const webServerRouter = require('./routes/web/webserver.router');
const authWebRouter = require('./routes/web/auth.webserver.router');

const { loginStrategy, signupStrategy, serializeUser, deserializeUser } = require('./passport/strategy');
const socketIo = require('./socket/index');
const { loggerPathAndMethod, loggerPathAndMethodNonExistent } = require('./middlewares/logger');

passport.use('login', loginStrategy);

passport.use('signup', signupStrategy);

passport.serializeUser(serializeUser);

passport.deserializeUser(deserializeUser);

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer);

app.use(compress());

app.use(koaBody());

app.use(serve(__dirname + '/public'));

app.keys = ['secret key one', 'secret key two'];;

app.use(session({
    rolling: true,
    httpOnly: false,
    secure: false,
    maxAge: 60000,
}, app));

const render = views(__dirname + '/views', { 
    extension: 'ejs',
});

app.use(render);

console.log(__dirname)

app.use(passport.initialize());
app.use(passport.session());

const onConnection = socket => {
    socketIo(io, socket);
}

io.on('connection', onConnection);

app.use(loggerPathAndMethod);

app.use(mount('/api/productos', productosRouter));

app.use(productosTestRouter.routes());

app.use(randomsApiRouter.routes());

app.use(messagesRouter.routes());

app.use(webServerRouter.routes());

app.use(authWebRouter.routes());

app.use(loggerPathAndMethodNonExistent);


module.exports = httpServer;