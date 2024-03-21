import boxen from 'boxen';
import { logMsg } from './utils.js';

const guideData = boxen(
    `\n Steps: \n 1: Generate token(In the page that just opened) \n 2: Open cmd input: del-repos \n 3: Select platform (default github) \n 4: Enter token \n 5: Select the repos to delete (enter to confirm) \n 6: Wait for deletion to complete \n \n Tips: The token filled in is only for permission verification, and there is no violation. After using this tool, you can also manually delete the corresponding token. \n\n`,
    {
        width: 60,
        height: 15,
        padding: 10,
        title: 'Delete Repositories',
        titleAlignment: 'center',
        borderColor: 'cyanBright',
        margin: {
            top: 1,
            right: 0,
            bottom: 1,
            left: 0,
        },
    }
);

const LogGuide = () => {
    logMsg(guideData, 'yellow');
};
export default LogGuide;
