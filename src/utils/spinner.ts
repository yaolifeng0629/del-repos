import ora from 'ora';

let spinner: ora.Ora;

export const startSpinner = (text: string) => {
    spinner = ora(text).start();
};

export const stopSpinner = (text: string) => {
    if (spinner) {
        spinner.succeed(text);
    }
};
