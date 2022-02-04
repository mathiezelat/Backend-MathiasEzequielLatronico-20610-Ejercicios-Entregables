const { Router } = require('express');

const upload = require('../services/multer/upload');

const {
    authPostSignup,
    authPostLogin,
    authGetLogout,
} = require('../controllers/auth.controller');

const router = Router();

router.post('/signup', [upload.single('foto')], authPostSignup);

router.post('/login', authPostLogin);

router.get('/logout', authGetLogout);

module.exports = router;
