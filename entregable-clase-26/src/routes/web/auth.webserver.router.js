// const { Router } = require('express');
// const passport = require('passport');

// const { isAuthWeb } = require('../../utils/auth');

// const authWebRouter = Router();


// authWebRouter.get('/login', (req, res) => {
//     res.render('pages/login');
// });

// authWebRouter.get('/signup', (req, res) => {
//     res.render('pages/signup');
// });

// console.log(passport.authenticate('login', { successRedirect: '/postlogin', failureRedirect: '/faillogin' } ))

// authWebRouter.post('/login', passport.authenticate('login', { successRedirect: '/home', failureRedirect: '/home' } ));

// authWebRouter.post('/signup', passport.authenticate('signup', { successRedirect: '/home', failureRedirect: '/home' } ));

// authWebRouter.get('/logout', isAuthWeb, (req, res) => {
//     req.logout();
//     req.render('pages/login');
// });

// module.exports = authWebRouter;
