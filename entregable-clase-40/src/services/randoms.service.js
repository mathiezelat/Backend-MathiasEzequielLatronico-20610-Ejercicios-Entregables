const { fork } = require('child_process');

const DEFAULT_CANT = 100_000_000;

const randomsNumbers = (cantidad = DEFAULT_CANT) => {
    const computo = fork('./src/utils/countRandomsNumbers.js');

    computo.send(cantidad);

    computo.on('message', (msg) => {
        return msg;
    });
};

module.exports = {
    randomsNumbers,
};
