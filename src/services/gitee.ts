import axios from 'axios';
import ora from 'ora';
import { extractPath } from '../utils';

const GITEE_API_BASE = 'https://gitee.com/api/v5';

export const fetchGiteeRepos = async (token: string) => {
    let page = 1;
    let repos: {
        html_url: string;
        full_name: string;
    }[] = [];
    let hasMore = true;

    // more information: https://gitee.com/api/v5/swagger#/getV5UsersUsernameRepos
    while (hasMore) {
        const response = await axios.get(`${GITEE_API_BASE}/user/repos`, {
            headers: {
                Authorization: `token ${token}`
            },
            params: {
                type: 'all',
                sort: 'updated',
                direction: 'desc',
                page,
                per_page: 100
            }
        });
        repos = repos.concat(response.data);
        hasMore = response.data.length === 100;
        page++;
    }

    return repos.map(repo => `${repo.full_name} \u001b]8;;${repo.html_url}\u0007🔗\u001b]8;;\u0007`);
};

export const deleteGiteeRepos = async (token: string, repos: string[]) => {
    const spinner = ora();
    let username = '';

    try {
        const response = await axios.get(`${GITEE_API_BASE}/user`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        username = response.data.login;
    } catch (error) {
        spinner.fail(`Failed to get username. ${(error as any).response?.data?.message || (error as Error).message}`);
        return;
    }

    for (let repo of repos) {
        spinner.start(`Deleting repository ${repo}...`);
        try {
            repo = extractPath(repo);

            const deleteUrl = `${GITEE_API_BASE}/repos/${username}/${repo}?access_token=${token}`;
            await axios.get(deleteUrl, {
                headers: {
                    Authorization: `token ${token}`
                }
            });
            // more information: https://gitee.com/api/v5/swagger#/deleteV5ReposOwnerRepo
            await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `token ${token}`
                }
            });

            spinner.succeed(`Deleted repository ${repo}.`);
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || (error as Error).message;
            spinner.fail(`Failed to delete repository ${repo}. ${errorMessage}`);
            console.error(`Error details: ${errorMessage}`);
        }
    }
};
