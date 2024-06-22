import axios from 'axios';
import ora from 'ora';

const GITEE_API_BASE = 'https://gitee.com/api/v5';

export const fetchGiteeRepos = async (token: string) => {
    let page = 1;
    let repos: { name: string }[] = [];
    let hasMore = true;

    // more information: https://gitee.com/api/v5/swagger#/getV5UsersUsernameRepos
    while (hasMore) {
        const response = await axios.get(`${GITEE_API_BASE}/user/repos`, {
            headers: {
                Authorization: `token ${token}`,
            },
            params: {
                type: 'all',
                sort: 'updated',
                direction: 'desc',
                page,
                per_page: 100,
            },
        });
        repos = repos.concat(response.data);
        hasMore = response.data.length === 100;
        page++;
    }

    return repos.map(repo => repo.name);
};

export const deleteGiteeRepos = async (token: string, repos: string[]) => {
    const spinner = ora();
    let username = '';

    try {
        const response = await axios.get(`${GITEE_API_BASE}/user`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        username = response.data.login;
    } catch (error) {
        spinner.fail(`Failed to get username. ${(error as any).response?.data?.message || (error as Error).message}`);
        return;
    }

    for (const repo of repos) {
        spinner.start(`Deleting repository ${repo}...`);
        try {
            const encodedRepo = encodeURIComponent(repo);
            const deleteUrl = `${GITEE_API_BASE}/repos/${username}/${encodedRepo}?access_token=${token}`;

            await axios.get(deleteUrl, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });
            // more information: https://gitee.com/api/v5/swagger#/deleteV5ReposOwnerRepo
            await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            spinner.succeed(`Deleted repository ${repo}.`);
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || (error as Error).message;
            spinner.fail(`Failed to delete repository ${repo}. ${errorMessage}`);
            console.error(`Error details: ${errorMessage}`);
        }
    }
};
