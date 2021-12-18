const express = require('express');
const session = require('express-session');
const { createServer } = require('http');
const { Server } = require('socket.io');
// const MongoStore = require('connect-mongo');
const passport = require('passport');

const messagesRouter = require('./routes/web/messages.router');
const productosTestRouter = require('./routes/web/productos.test.router');
const productosRouter = require('./routes/api/productos.router');
const webServerRouter = require('./routes/web/webserver.router');
// const authWebRouter = require('./routes/web/auth.webserver.router');

const { Strategy: LocalStrategy } = require('passport-local');

// const { UsersDao } = require('./daos/index');
// const { isValidPassword, createHash } = require('./utils/bcrypt');

// const myUsers = new UsersDao();

// const { loginStrategy, singupStrategy, serialize, deserialize } = require('./passport/strategy');
const socketIo = require('./socket/index');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const users = [];

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},(email, password, done) => {
    console.log({email})

    const isUserExist = users.find((data) => data.email === email);

    if (!isUserExist) {
        console.log('User Not Found with username');
        return done(null, false, { message: 'User Not Found with username' });
    }

    const user = users.find(
        (data) => data.email === email && data.password === password,
    );

    if (!user) {
        console.log('Invalid Password');
        return done(null, false, { message: 'Invalid Password' });
    }

    return done(null, user);

}));

passport.use('signup', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, (req, email, password, done) => {
    console.log({email})
    const isUserExist = users.find((data) => data.email === email);

    if (isUserExist) {
        console.log('User already exists');
        return done(null, false, { message: 'User already exists' });
    }

    const newUser = {
        email, 
        password,
        id: (users.length !== 0) ? users[users.length - 1].id + 1 : 0
    }

    users.push(newUser);

    console.log({ users });

    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find((data) => data.id === id);
    done(null, user);
});

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.use(express.static(__dirname + '/public'));


app.use(session({
    // store: MongoStore.create({
    //     mongoUrl: 'mongodb://localhost/sesiones',
    //     mongoOptions: {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     }
    // }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000,
        secure: false,
        httpOnly: false
    },
    rolling: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const onConnection = socket => {
    socketIo(io, socket);
}

io.on('connection', onConnection);

const { isAuthWeb } = require('./utils/auth');

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.get('/signup', (req, res) => {
    res.render('pages/signup');
});

app.get('/fail', (req, res) => {
    res.send('error')
})

app.post('/login', passport.authenticate('login', { successRedirect: '/home', failureRedirect: '/fail' }));

app.post('/signup', passport.authenticate('signup', { successRedirect: '/home', failureRedirect: '/fail' }));

app.get('/logout', isAuthWeb, (req, res) => {
    req.logout();
    
    req.session.destroy((err) => {
        if (err) return res.json({ error: err });

        res.send(`Hasta luego`);
    })
});

app.use('/api/productos', productosRouter);

app.use('/api/productos-test', productosTestRouter);

app.use('/messages', messagesRouter);

app.use(webServerRouter);

// app.use(authWebRouter);


module.exports = httpServer;