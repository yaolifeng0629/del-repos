import inquirer from 'inquirer';
import open from 'open';
import { green, cyan, yellow, dim } from 'kolorist';

export const promptPlatform = async () => {
    console.log(cyan('\n🚀  Platform Selection'));
    console.log(dim('Choose the platform where you want to delete repositories.\n'));

    const { platform } = await inquirer.prompt([
        {
            type: 'list',
            name: 'platform',
            message: '🌐  Choose a platform:',
            choices: [
                { name: '🐙  GitHub', value: 'GitHub' },
                { name: '🦊  Gitee', value: 'Gitee' },
            ],
        },
    ]);

    console.log(green(`✅  Selected platform: ${platform}\n`));
    return platform;
};

export const promptToken = async (platform: string) => {
    console.log(cyan('\n🔑  Token Authentication'));
    console.log(dim('You need a personal access token to authenticate with the API.\n'));

    if (platform === 'GitHub') {
        console.log(yellow('🌐  Opening GitHub token generation page...'));
        console.log(dim('Required scopes: delete_repo, project, repo\n'));
        await open('https://github.com/settings/tokens/new?scopes=delete_repo,project,repo&description=deleteRepos');
    } else {
        console.log(yellow('🌐  Opening Gitee token generation page...'));
        console.log(dim('Make sure to grant repository deletion permissions\n'));
        await open('https://gitee.com/profile/personal_access_tokens/new');
    }

    const { token } = await inquirer.prompt([
        {
            type: 'password',
            name: 'token',
            message: `🔐  Please enter your ${platform} token:`,
            mask: '*',
            validate: input => {
                if (input.trim().length === 0) {
                    return 'Token cannot be empty';
                }
                if (input.trim().length < 10) {
                    return 'Token seems too short, please check';
                }
                return true;
            },
        },
    ]);

    console.log(green('✅  Token received successfully\n'));
    return token;
};

export const promptRepositories = async (repos: string[]) => {
    console.log(cyan('\n📦  Repository Selection'));
    console.log(dim('Select repositories to delete using space key, then press enter to confirm.\n'));

    const { selectedRepos } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedRepos',
            message: `Select repositories to delete (${repos.length} total):`,
            choices: repos,
            pageSize: 20,
            validate: answer => {
                if (answer.length === 0) {
                    return 'You must choose at least one repository.';
                }
                return true;
            },
        },
    ]);

    // 显示选择结果
    if (selectedRepos.length > 0) {
        console.log(green(`\n✅  Selected ${selectedRepos.length} repositories for deletion:`));
        selectedRepos.forEach((repo: string, index: number) => {
            const cleanRepoName = repo.split(' ')[0]; // 移除链接部分显示
            console.log(dim(`  ${index + 1}. ${cleanRepoName}`));
        });
        console.log('');
    }

    return selectedRepos;
};
