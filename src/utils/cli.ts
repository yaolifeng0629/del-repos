import inquirer from 'inquirer';
import open from 'open';

export const promptPlatform = async () => {
    const { platform } = await inquirer.prompt([
        {
            type: 'list',
            name: 'platform',
            message: 'Choose a platform:',
            choices: ['GitHub', 'Gitee']
        }
    ]);
    return platform;
};

export const promptToken = async (platform: string) => {
    if (platform === 'GitHub') {
        console.log('Opening GitHub token generation page...');
        await open('https://github.com/settings/tokens/new?scopes=delete_repo,project,repo&description=deleteRepos');
    } else {
        console.log('Opening Gitee token generation page...');
        await open('https://gitee.com/profile/personal_access_tokens/new');
    }

    const { token } = await inquirer.prompt([
        {
            type: 'input',
            name: 'token',
            message: `Please enter your ${platform} token:`
        }
    ]);
    return token;
};

export const promptRepositories = async (repos: string[]) => {
    const { selectedRepos } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedRepos',
            message: 'Select the repositories you want to delete:\n',
            choices: repos
        }
    ]);
    return selectedRepos;
};
