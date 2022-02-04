const { Router } = require('express');

const {
    usersGet,
} = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet);

module.exports = router;