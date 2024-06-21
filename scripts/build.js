const { exec } = require('child_process');
const ora = require('ora');

const spinner = ora('Building the project...').start();

exec('tsc', (error, stdout, stderr) => {
    if (error) {
        spinner.fail('Build failed.');
        console.error(`exec error: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
    }
    if (stdout) {
        console.log(`stdout: ${stdout}`);
    }
    spinner.succeed('Build completed.');
});
