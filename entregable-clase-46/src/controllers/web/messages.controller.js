const getMessagesHome = async (ctx) => {
    await ctx.render('pages/messages');
};

module.exports = {
    getMessagesHome,
};
