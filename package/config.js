
const QUESTION_LIST = [
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
]

const GITHUB_LINK = 'https://github.com/settings/tokens/new?scopes=delete_repo,project,delete:packages,repo&description=deleteRepos';

export {
    QUESTION_LIST,
    GITHUB_LINK
}
