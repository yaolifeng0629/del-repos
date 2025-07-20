import ora from 'ora';
import { green, red, yellow } from 'kolorist';

let spinner: ora.Ora;

export const startSpinner = (text: string) => {
    spinner = ora({
        text: text,
        spinner: 'dots',
        color: 'cyan'
    }).start();
};

export const stopSpinner = (text: string, success: boolean = true) => {
    if (spinner) {
        if (success) {
            spinner.succeed(green(text));
        } else {
            spinner.fail(red(text));
        }
    }
};

export const updateSpinner = (text: string) => {
    if (spinner) {
        spinner.text = text;
    }
};

export const warnSpinner = (text: string) => {
    if (spinner) {
        spinner.warn(yellow(text));
    }
};
