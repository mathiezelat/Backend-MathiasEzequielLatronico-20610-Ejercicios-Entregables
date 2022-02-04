const isAuthWeb = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    next();
};

const isUserLogged = (req, res, next) => {
    if (req.isAuthenticated()) return res.redirect('/');
    next();
}

module.exports = { 
    isAuthWeb,
    isUserLogged
};