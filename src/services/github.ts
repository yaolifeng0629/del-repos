import axios from 'axios';
import ora from 'ora';

const GITHUB_API_BASE = 'https://api.github.com';

export const fetchGithubRepos = async (token: string) => {
    let page = 1;
    let repos: { name: string }[] = [];
    let hasMore = true;

    while (hasMore) {
        // more information: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-the-authenticated-user
        const response = await axios.get(`${GITHUB_API_BASE}/user/repos`, {
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

export const deleteGithubRepos = async (token: string, repos: string[]) => {
    const spinner = ora();
    let username = '';

    try {
        const response = await axios.get(`${GITHUB_API_BASE}/user`, {
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
            const deleteUrl = `${GITHUB_API_BASE}/repos/${username}/${encodedRepo}`;

            // more information: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-a-repository
            await axios.get(deleteUrl, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });
            // more information: https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#delete-a-repository
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
