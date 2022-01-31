const webServerGetHome = (req, res) => {
    const {
        email,
        nombre,
        edad,
        direccion,
        telefono,
        foto,
        _id: id,
    } = req.user;

    res.render('pages/index', {
        user: {
            email,
            nombre,
            edad,
            direccion,
            telefono,
            foto,
            id
        },
    });
};

const webServerGetSignup = (req, res) => {
    res.render('pages/signup');
};

const webServerGetLogin = (req, res) => {
    res.render('pages/login');
};

const webServerGetFail = (req, res) => {
    res.render('pages/fail', {
        error: req.flash('error')[0] || {
            message: '',
            auth: '',
        },
    });
};

module.exports = {
    webServerGetHome,
    webServerGetSignup,
    webServerGetLogin,
    webServerGetFail,
};
