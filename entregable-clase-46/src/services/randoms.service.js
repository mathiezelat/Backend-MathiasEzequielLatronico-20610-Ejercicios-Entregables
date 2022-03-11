const { fork } = require('child_process');

const DEFAULT_CANT = 100_000_000;

const randomsNumbers = (cantidad = DEFAULT_CANT) => {
    return new Promise((resolve, reject) => {
        const computo = fork('./src/utils/countRandomsNumbers.js');
        
        computo.send(cantidad);
        
        computo.on('message', (msg) => {
            resolve(msg);
        });
    })
};

module.exports = {
    randomsNumbers,
};
