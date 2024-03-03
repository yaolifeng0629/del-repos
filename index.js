import { Octokit } from '@octokit/rest';
import inquirer from 'inquirer';
import LogGuide from './package/guide.js';
import { openBower, logMsg } from './package/utils.js';
import Loading from './package/loading.js';
import { QUESTION_LIST, GITHUB_LINK } from './package/config.js';

// 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

main();

let answers = null;
let owner = '';
let octokit = null;

async function main() {
    LogGuide();
    // await openBower(GITHUB_LINK);

    answers = await prompt(QUESTION_LIST);
    await handlePlatform(answers.platform);
}

async function prompt(questionList) {
    const answers = await inquirer.prompt(questionList);
    return answers;
}
function createOctokitInstance(token) {
    return new Octokit({
        auth: token,
    });
}

const platforms = {
    Github: {
        handle: async function () {
            Loading.start();
            answers.token = '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';
            octokit = createOctokitInstance(answers.token);
            const allRepos = await getUserAllRepos();
            await showRepos(allRepos);
        },
    },
    Gitee: {
        handle: function () {
            logMsg('暂不支持Gitee', 'red');
        },
    },
};

async function handlePlatform(platform) {
    const platformHandler = platforms[platform];
    if (platformHandler) {
        await platformHandler.handle();
    } else {
        logMsg('未知的平台', 'red');
    }
}

const getUserAllRepos = async () => {
    try {
        const { data } = await octokit.repos.listForAuthenticatedUser({
            visibility: 'all',
        });

        let allRepos = data.map(item => {
            return {
                owner: item.owner.login,
                name: item.name,
                fullName: item.full_name,
                description: item.description,
                url: item.html_url,
                language: item.language,
                details: {
                    stars: item.stargazers_count,
                    forks: item.forks_count,
                    watchers: item.watchers_count,
                },
                clone: {
                    gitUrl: item.clone_url,
                    sshUrl: item.ssh_url,
                    svnUrl: item.svn_url,
                },
            };
        });
        Loading.stop();
        return allRepos;
    } catch (error) {
        Loading.stop();
        logMsg(`Error fetching repos: ${error}`, 'red');
    }
};

const showRepos = async repos => {
    try {
        owner = repos[0].owner;

        let reposList = repos.map((item, index) => {
            return {
                name: item.fullName,
                value: item.name,
                description: item.description,
            };
        });
        const answers = await inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Please select repositories to delete.',
                name: 'repos',
                choices: reposList,
                validate: function (answer) {
                    if (answer.length < 1) {
                        return 'You must choose at least one topping.';
                    }
                    return true;
                },
            },
        ]);

        await deleteRepos(answers.repos);
    } catch (error) {
        logMsg(error, 'red');
    }
};

let count = 0;
async function deleteRepos(repos) {
    Loading.start();
    for (const repo of repos) {
        try {
            await octokit.repos.delete({
                owner: owner,
                repo,
            });
            count++;
        } catch (err) {
            Loading.stop();
            logMsg(`Failed to delete repository: ${repo}`, 'red');
            logMsg(err, 'red');
        }
    }
    if (count === repos.length) {
        Loading.stop();
        logMsg(`Successfully deleted ${count} repositories`, 'green');
    }
}
