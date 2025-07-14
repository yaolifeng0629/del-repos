#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import { blue, green, red, yellow, cyan, bold, dim } from 'kolorist';
import { promptPlatform, promptToken, promptRepositories } from './utils/cli';
import { fetchGithubRepos, deleteGithubRepos } from './services/github';
import { fetchGiteeRepos, deleteGiteeRepos } from './services/gitee';
import { startSpinner, stopSpinner } from './utils/spinner';
import { readFileSync } from 'fs';
import { reposType } from './utils';
import { join } from 'path';

const packageJsonPath = join(__dirname, '../package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 [options]')
    .version(version)
    .alias('v', 'version')
    .help('h')
    .alias('h', 'help')
    .option('t', {
        alias: 'type',
        describe: '显示的仓库列表类型(o: owner, a: all)',
        choices: ['o', 'a'], // 限制参数值为 'o': owner 或 'a': all
        demandOption: false, // 是否可选参数
        type: 'string',
    })
    .epilog('For more information, visit https://github.com/yaolifeng0629/del-repos.git').argv;

const printWelcomeBanner = () => {
    console.log(bold(cyan('\n╔══════════════════════════════════════════════════════════════╗')));
    console.log(bold(cyan('║                    🗑️  Del-Repos Cli Tool                     ║')));
    console.log(bold(cyan('║                                                              ║')));
    console.log(bold(cyan('║              Batch Delete GitHub/Gitee Repositories          ║')));
    console.log(bold(cyan('╚══════════════════════════════════════════════════════════════╝')));
    console.log('                        Version: ' + version + '\n');
};

const main = async () => {
    printWelcomeBanner();

    const platform = await promptPlatform();

    const token = await promptToken(platform);

    console.log(cyan('📡  Fetching Repository Information'));
    startSpinner(' Fetching your repositories...');

    /**
     * 获取仓库类型
     * @param t(type) 仓库类型: owner || all
     */
    const { t: type = 'a' } = await argv;
    const repoType = reposType(type);
    const typeDisplay = type === 'o' ? 'owner repositories' : 'all repositories';

    try {
        let repos;
        if (platform === 'GitHub') {
            repos = await fetchGithubRepos(token, repoType);
        } else {
            repos = await fetchGiteeRepos(token, repoType);
        }

        stopSpinner(`✅  Successfully fetched ${repos.length} ${typeDisplay}`);

        if (repos.length === 0) {
            console.log(yellow('⚠️  No repositories found.'));
            console.log(dim('This might be because:'));
            console.log(dim('  • You have no repositories'));
            console.log(dim('  • Your token doesn\'t have the required permissions'));
            console.log(dim('  • There was an issue with the API request\n'));
            process.exit(0);
        }

        const selectedRepos = await promptRepositories(repos);

        if (selectedRepos.length === 0) {
            console.log(yellow('⚠️  No repositories selected for deletion.'));
            console.log(dim('Operation cancelled.\n'));
            process.exit(0);
        }

        // 确认删除
        console.log(red('\n⚠️  DANGER ZONE  ⚠️'));
        console.log(red('You are about to permanently delete the following repositories:'));
        selectedRepos.forEach((repo: string, index: number) => {
            const cleanRepoName = repo.split(' ')[0];
            console.log(red(`  ${index + 1}. ${cleanRepoName}`));
        });
        console.log(red('\n❗  This action CANNOT be undone!\n'));

        const { confirmDelete } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmDelete',
                message: '💀  Are you absolutely sure you want to delete these repositories?',
                default: false,
            },
        ]);

        if (!confirmDelete) {
            console.log(green('✅  Operation cancelled. No repositories were deleted.\n'));
            process.exit(0);
        }

        console.log(cyan('\n🗑️  Starting Deletion Process'));
        if (platform === 'GitHub') {
            await deleteGithubRepos(token, selectedRepos);
        } else {
            await deleteGiteeRepos(token, selectedRepos);
        }

        console.log(green('\n🎉  All selected repositories have been successfully deleted!'));
        console.log(dim('Thank you for using del-repos CLI tool.\n'));
    } catch (error) {
        stopSpinner('❌  Failed to fetch repositories');
        console.log(red('\n💥  An error occurred:'));
        console.error(red((error as Error).message));
        console.log(dim('\nPlease check:'));
        console.log(dim('  • Your internet connection'));
        console.log(dim('  • Your token permissions'));
        console.log(dim('  • The platform API status\n'));
        process.exit(1);
    }
};

main();
