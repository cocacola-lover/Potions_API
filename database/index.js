"use strict";
function main(args) {
    let command = args.shift();
    if (command === undefined) {
        console.log('Hello my brother 🌈');
    }
    else if (command === 'deploy') {
        const createTables = require('./deploy');
        createTables();
    }
}
main(['deploy']);
