import ora from 'ora';

class Spinner {
    constructor(message) {
        this.spinner = ora(message);
    }

    start() {
        this.spinner.start();
    }

    stop() {
        this.spinner.stop();
    }
}

export default new Spinner('Loading ...');
