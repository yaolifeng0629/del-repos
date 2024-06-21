#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { blue } from 'kolorist';
import { promptPlatform, promptToken, promptRepositories } from './utils/cli';
import { fetchGithubRepos, deleteGithubRepos } from './services/github';
import { fetchGiteeRepos, deleteGiteeRepos } from './services/gitee';
import { startSpinner, stopSpinner } from './utils/spinner';
import { readFileSync } from 'fs';
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
    .epilog('For more information, visit https://github.com/yaolifeng0629/del-repos.git')
    .argv;

const main = async () => {
    console.log(blue('Welcome to the Repository Deletion CLI Tool'));

    const platform = await promptPlatform();

    if (platform === 'Gitee') {
        console.log(blue('Gitee support is now available.'));
    }

    const token = await promptToken(platform);

    startSpinner('Fetching your repositories...');

    try {
        let repos;
        if (platform === 'GitHub') {
            repos = await fetchGithubRepos(token);
        } else {
            repos = await fetchGiteeRepos(token);
        }

        stopSpinner('Fetched repositories successfully.');

        const selectedRepos = await promptRepositories(repos);

        if (selectedRepos.length === 0) {
            console.log(blue('No repositories selected.'));
            process.exit(1);
        }

        if (platform === 'GitHub') {
            await deleteGithubRepos(token, selectedRepos);
        } else {
            await deleteGiteeRepos(token, selectedRepos);
        }

        console.log(blue('All selected repositories have been deleted.'));
    } catch (error) {
        stopSpinner('Failed to fetch repositories.');
        console.error((error as Error).message);
    }
};

main();
