const { Router } = require('express');
const { fork } = require('child_process');

const randomsApiRouter = Router();

const DEFAULT_CANT = 100_000_000;

randomsApiRouter.get('/', (req, res) => {
    const { cant = DEFAULT_CANT } = req.query;

    const computo = fork('./src/utils/countRandomsNumbers.js');
    
    computo.send(cant);

    computo.on('message', msg => {
        res.json(msg);
    })

});

randomsApiRouter.get('/health', (req, res) => {
    res.json({ date: new Date().toLocaleString() })
});

module.exports = randomsApiRouter;