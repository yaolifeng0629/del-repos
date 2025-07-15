import inquirer from 'inquirer';
import searchCheckboxPrompt from 'inquirer-search-checkbox';
import open from 'open';
import { green, cyan, yellow, dim } from 'kolorist';
import { getToken, saveToken } from './config';

// 注册搜索多选框插件
inquirer.registerPrompt('search-checkbox', searchCheckboxPrompt);

export const promptPlatform = async () => {
    console.log(cyan('\n🚀  Platform Selection'));
    console.log(dim('Choose the platform where you want to delete repositories.\n'));

    const { platform } = await inquirer.prompt([
        {
            type: 'list',
            name: 'platform',
            message: 'Choose a platform:',
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
    // 检查是否已存在token配置
    const existingToken = getToken(platform);
    if (existingToken) {
        console.log(green(`✅  Found existing ${platform} token in config\n`));
        return existingToken;
    }

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
            message: `Please enter your ${platform} token:`,
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

    // 询问是否保存token
    const { saveTokenChoice } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'saveTokenChoice',
            message: 'Save this token to config file for future use?',
            default: true,
        },
    ]);

    if (saveTokenChoice) {
        saveToken(platform, token);
        console.log(green('💾  Token saved to config file'));
    }

    console.log(green('✅  Token received successfully\n'));
    return token;
};

export const promptRepositories = async (repos: string[]) => {
    console.log(cyan('\n📦  Repository Selection'));
    console.log(dim('🔍 Use search to filter repositories, Space to select/deselect, Enter to confirm.\n'));

    // 为每个仓库添加序号并格式化显示，确保每个选项占一行
    const formattedChoices = repos.map((repo, index) => {
        const paddedIndex = String(index + 1).padStart(3, ' ');
        return {
            name: `${paddedIndex}. ${repo}`,
            value: repo,
            short: repo // 选中后显示的简短名称
        };
    });

    const { selectedRepos } = await inquirer.prompt([
        {
            type: 'search-checkbox',
            name: 'selectedRepos',
            message: `Search and select repositories to delete (${repos.length} total): \n`,
            choices: formattedChoices,
            pageSize: 20, // 显示的选项数量
            loop: false, // 禁用循环滚动
            searchPlaceholder: 'Type to search repositories...',
            emptyText: 'No repositories match your search',
            validate: answer => {
                if (answer.length === 0) {
                    return 'You must choose at least one repository.';
                }
                return true;
            },
        },
    ], {
        // 设置输出流，确保正确的终端显示
        output: process.stdout,
        input: process.stdin
    });

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
