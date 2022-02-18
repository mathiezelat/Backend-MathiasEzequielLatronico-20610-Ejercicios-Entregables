const getHome = (req, res) => {
    res.redirect('/login');
};

const getLogin = (req, res) => {
    res.render('pages/login');
};

const getSignup = (req, res) => {
    res.render('pages/signup');
};

const getFailLogin = (req, res) => {
    res.render('pages/fail', { error: { authenticate: 'login' } });
};

const getFailSignup = (req, res) => {
    res.render('pages/fail', { error: { authenticate: 'signup' } });
};

const getLogout = (req, res) => {
    req.logout();

    req.session.destroy((err) => {
        if (err) return res.json({ error: err });

        res.redirect('/login');
    });
};

module.exports = {
    getHome,
    getLogin,
    getSignup,
    getFailLogin,
    getFailSignup,
    getLogout,
};
