const getRandomInt = require('./getRandomInt');

process.on('message', cant => {
    const numbers = [];

    for (let i = 0; i < cant; i++) {
        numbers.push(getRandomInt(0, 1001));
    }

    const result = {};

    numbers.forEach((number) => {
        if( result[number] ){
            result[number]++
        } else {
            result[number] = 1
        }
    })

    process.send(result);
})
