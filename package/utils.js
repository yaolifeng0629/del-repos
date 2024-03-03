import chalk from 'chalk';
import open from 'open';

function logMsg(message, color) {
    console.log(chalk[color](message));
}

async function openBower(link) {
    await open(link);

    // Open an application
    // const open = require('open');
    // (async () => {
    //     await open('/', {app: 'Visual Studio Code'});
    // })();
}

export {
    logMsg,
    openBower
}
