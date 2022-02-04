const passport = require('passport');

const authPostSignup = passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/fail',
    failureFlash: true,
});

const authPostLogin = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/fail',
    failureFlash: true,
});

const authGetLogout = (req, res, next) => {
    req.logout();

    req.session.destroy((error) => {
        if (error) return next(error);

        res.redirect('/login');
    });
};

module.exports = {
    authPostSignup,
    authPostLogin,
    authGetLogout,
};
