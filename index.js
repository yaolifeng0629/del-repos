const { Octokit } = require('@octokit/rest');

// 创建一个 Octokit 实例
const octokit = new Octokit({
    auth: '你的 GitHub 令牌',
});

// 要删除的仓库列表
const reposToDelete = ['repo1', 'repo2', 'repo3'];

// 对每个仓库执行删除操作
reposToDelete.forEach(async repo => {
    try {
        await octokit.repos.delete({
            owner: '你的 GitHub 用户名',
            repo,
        });
        console.log(`成功删除仓库: ${repo}`);
    } catch (err) {
        console.error(`删除仓库失败: ${repo}`, err);
    }
});
