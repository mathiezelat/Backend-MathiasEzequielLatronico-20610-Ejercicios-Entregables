const { Router } = require('express');

const { authWeb } = require('../../utils/auth');

const authWebRouter = Router();

authWebRouter.post('/login', (req, res) => {
    const { name } = req.body;
    req.session.name = name;
    res.redirect('/home');
});

authWebRouter.get('/login', (req, res) => {
    res.render('pages/login');
});

authWebRouter.get('/logout', authWeb, (req, res) => {
    const name = req.session?.name;

    if(name){
        req.session.destroy( err => {
            if(!err){
                res.render('pages/logout', { user: { name } } );
            } else {
                res.status(400).send({ error: `Ocurrio un error al Desloguear: ${err}` })
            }
        })
    }
});

module.exports = authWebRouter;