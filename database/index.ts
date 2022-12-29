

function main (args : string[]) {
    let command : string | undefined = args.shift(); 

    if (command === undefined) {
        console.log('Hello my brother 🌈');
    } else if (command === 'deploy') {
        const createTables = require('./deploy');

        createTables();
    }
}   

main(['deploy']);