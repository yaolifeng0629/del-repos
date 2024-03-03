import chalk from 'chalk';
import open from 'open';

function logMsg(message, color) {
    console.log(chalk[color](message));
}

async function openBower(link) {
    await open(link);

    // 打开某个应用程序
    // const open = require('open');
    // (async () => {
    //     await open('/', {app: 'Visual Studio Code'});
    // })();
}

export {
    logMsg,
    openBower
}
