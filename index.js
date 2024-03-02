const { Octokit } = require('@octokit/rest');
const inquirer = require('inquirer');
const open = require('open');
const os = require('os');
const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');
// 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

// const PLATFORM = os.platform();
// if (platform === 'darwin') {
//     console.log('User is using macOS.');
// } else if (platform === 'win32') {
//     console.log('User is using Windows.');
// } else if (platform === 'linux') {
//     console.log('User is using Linux.');
// } else {
//     console.log('User platform is ' + platform);
// }


// 对于Linux和Mac用户
// open('http://google.com');
// 而在Windows上
// start http://www.google.com


// const GITHUB_LINK = 'https://github.com/settings/tokens/new?scopes=delete_repo,repo&description=Repo Remover Token';
// const GITEE_LINK = '';

let spinner = null;
let platform = '';
let token = '';
let owner = null;
let octokit = null;
inquirer
    .prompt([
        {
            type: 'list',
            name: 'platform',
            message: 'Please select a platform?',
            choices: [
                {
                    name: 'Github',
                    value: 'Github',
                    description: 'Github',
                },
                {
                    name: 'Gitee',
                    value: 'Gitee',
                    description: 'Gitee',
                },
            ],
        },
        {
            type: 'input',
            name: 'token',
            message: 'Please enter your token?\n',
        }
    ])
    .then(async answers => {
        console.log('answers ---->', answers);

        platform = answers.platform;
        token = answers.token;
        octokit = createOctokitInstance(token);

        if (platform === 'Github') {
            spinner = ora('Loading Repository ...').start();
            let allRepos = await getUserAllRepos();
            // console.log('allRepos ---->', allRepos);
            owner = allRepos[0].owner;
            await showRepos(allRepos);
        } else if (platform === 'Gitee') {
            console.log(chalk.red('暂不支持Gitee'));
        }
    });

const getUserAllRepos = async () => {
    try {


        const { data } = await octokit.repos.listForAuthenticatedUser();

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
                }
            }
        });
        spinner.stop();
        return allRepos;
    } catch (error) {
        console.error("Error fetching repos: ", error);
    }
}

const showRepos = async (repos) => {
    try {
        let reposList = repos.map((item, index) => {
            return {
                name: item.fullName,
                value: item.name,
                description: item.description,
            }
        });;
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
                }
            }
        ]);

        console.log(answers);
        await deleteRepos(octokit, answers.repos);
    } catch (error) {
        console.error(error);
    }
}


async function deleteRepos(octokit, reposToDelete) {
    for (const repo of reposToDelete) {
        try {
            await octokit.repos.delete({
                owner: owner,
                repo,
            });
            console.log(`成功删除仓库: ${repo}`);
        } catch (err) {
            console.error(`删除仓库失败: ${repo}`, err);
        }
    }
}

function createOctokitInstance(token) {
    return new Octokit({
        auth: token,
    });
}
