const getHome = (ctx) => {
    ctx.redirect('/login');
};

const getLogin = async (ctx) => {
    await ctx.render('pages/login');
};

const getSignup = async (ctx) => {
    await ctx.render('pages/signup');
};

const getFailLogin = async (ctx) => {
    await ctx.render('pages/fail', { error: { authenticate: 'login' } });
};

const getFailSignup = async (ctx) => {
    await ctx.render('pages/fail', { error: { authenticate: 'signup' } });
};

const getLogout = (ctx) => {
    ctx.logout();

    ctx.session = null;
    ctx.redirect('/login');
};

module.exports = {
    getHome,
    getLogin,
    getSignup,
    getFailLogin,
    getFailSignup,
    getLogout,
};
