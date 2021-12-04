const authWeb = (req, res, next) => {
    if(req.session?.name){
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = { authWeb };