const isAuthWeb = async (ctx, next) => {
    if (!ctx.isAuthenticated()) return ctx.redirect('/login');
    return await next();
};

const isUserLogged = async (ctx, next) => {
    if (ctx.isAuthenticated()) return ctx.redirect('/home');
    return await next();
}

module.exports = { 
    isAuthWeb,
    isUserLogged
};