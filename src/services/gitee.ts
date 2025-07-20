import axios from 'axios';
import ora from 'ora';
import { extractPath } from '../utils';
import { green, red, yellow, cyan, dim } from 'kolorist';

const GITEE_API_BASE = 'https://gitee.com/api/v5';

/**
 * 获取 Gitee 仓库
 * @param token Gitee token
 * @param type 仓库类型: owner || all
 * @returns 仓库列表
 */

export const fetchGiteeRepos = async (token: string, type: string) => {
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
                Authorization: `token ${token}`,
            },
            params: {
                type: type,
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

    return repos.map(repo => `${repo.full_name} \u001b]8;;${repo.html_url}\u0007🔗\u001b]8;;\u0007`);
};

/**
 * 删除 Gitee 仓库
 * @param token Gitee token
 * @param repos 待删除的仓库
 * @returns 删除结果
 */
export const deleteGiteeRepos = async (token: string, repos: string[]) => {
    const spinner = ora();
    let username = '';

    // 获取用户名
    console.log(dim('🔍 Verifying user credentials...'));
    try {
        const response = await axios.get(`${GITEE_API_BASE}/user`, {
            headers: {
                Authorization: `token ${token}`,
            },
        });
        username = response.data.login;
        console.log(green(`✅  Authenticated as: ${username}\n`));
    } catch (error) {
        console.log(red('❌  Failed to authenticate with Gitee'));
        console.error(red(`Error: ${(error as any).response?.data?.message || (error as Error).message}\n`));
        return;
    }

    let successCount = 0;
    let failCount = 0;
    const totalRepos = repos.length;

    console.log(cyan(`🗑️  Starting deletion of ${totalRepos} repositories...\n`));

    for (let i = 0; i < repos.length; i++) {
        let repo = repos[i];
        const repoName = extractPath(repo);
        const progress = `(${i + 1}/${totalRepos})`;

        spinner.start(`${progress} Deleting ${yellow(repoName)}...`);

        try {
            const deleteUrl = `${GITEE_API_BASE}/repos/${username}/${repoName}?access_token=${token}`;

            // 验证仓库存在
            await axios.get(deleteUrl, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            // 删除仓库
            await axios.delete(deleteUrl, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            spinner.succeed(`${progress} ${green('✅  Deleted')} ${repoName}`);
            successCount++;
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || (error as Error).message;
            spinner.fail(`${progress} ${red('❌ Failed to delete')} ${repoName}`);
            console.log(dim(`   └─ Error: ${errorMessage}`));
            failCount++;
        }
    }

    // 显示最终结果
    console.log(cyan('\n📊  Deletion Summary:'));
    console.log(green(`  ✅  Successfully deleted: ${successCount} repositories`));
    if (failCount > 0) {
        console.log(red(`  ❌  Failed to delete: ${failCount} repositories`));
    }
    console.log(dim(`  📈  Success rate: ${Math.round((successCount / totalRepos) * 100)}%\n`));
};
