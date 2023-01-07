
import prompt = require('prompt-sync');
const promptS = prompt({sigint: true});

async function main () {

    const host = promptS('Please write host name: ');
    const user = promptS('Please write username: ');
    const password = promptS('Please write password: ');
    const database = promptS('Please write database name: ');

    const command = promptS('Do you want to deploy tables or drop them? Write "drop" or "deploy": ')

    if (command === 'drop') {
        const dropTables = require('./delete');

        await dropTables({host, user, password, database});
    } else if (command === 'deploy') {
        const createTables = require('./deploy');

        await createTables({host, user, password, database});
    } else {
        console.log('Wrong Input');
    }
}   

main();