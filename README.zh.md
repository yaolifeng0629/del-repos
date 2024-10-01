<h1 align="center">del-repos</h1>

<p align="center">English | <a href="./README.zh.md">中文</a></p>

<p align="center"><img src="screen.png" width=90%"/></p>

### ⚡ 介绍

`del-repos` 一个用于批量删除 GitHub 或 Gitee 仓库的命令行工具。

### 🛠️ 功能

-   支持 `GitHub` 和 `Gitee` 平台
-   批量删除选定的仓库
-   通过交互式命令行界面选择要删除的仓库

### 🚀 安装

#### 前提条件

-   你的电脑上已经安装 `Node.js`，你可以从 [Node.js 官网](https://nodejs.org/) 下载和安装。

#### 安装步骤

1. 打开终端
2. 输入以下命令来安装 `del-repos`：

```bash
npm install del-repos -g
# or
pnpm install del-repos -g
```

-   选项
    -   `-v`, `--version` 显示版本号
    -   `-h`, `--help` 显示帮助信息

### 🌟 使用

1.  选择平台（`GitHub` 或 `Gitee`）。
2.  输入对应平台的访问令牌（`Token`）。
3.  对于 `GitHub` 或 `Gitee`，工具会打开对应平台的 `Token` 生成页面。
4.  工具会获取你的仓库列表，并让你选择要删除的仓库。
    - 仓库名后的 🔗 符号为快捷链接,点击可直接访问对应仓库。
5.  确认选择后，工具将批量删除选定的仓库。

### ⚠️ 注意事项

-   删除前请确认待删除的仓库，因为删除的仓库无法恢复。
-   在使用 `del-repos` 之前，确保你的 `Token` 有足够的权限来删除仓库。
-   如果你遇到任何问题，或者有任何建议，欢迎提交 `Issue`。

### 🙌 贡献

-   我们欢迎所有的贡献和建议。如果你想为 `del-repos` 做出贡献，你可以：

1.  克隆仓库：

```bash
git clone https://github.com/yaolifeng0629/del-repos.git

cd del-repos
```

2.  安装依赖：

```bash
npm install
# or
pnpm install
```

3.  进行开发和测试：

```bash
npm run dev
# or
pnpm dev
```

-   欢迎提交问题（`Issues`）和合并请求（`Pull Requests`）！
-   感谢所有已经为 `del-repos` 做出贡献的人！🎉

### 赞助

如果你觉得这个工具对你有所帮助，麻烦动动小手给我的 [GitHub](https://github.com/yaolifeng0629/del-repos) 仓库点个 Star！

你的支持是我前进的动力！

<p class="qrcode" style="display: flex; justify-content: space-between;">
  <img src="/wechat.jpg" alt="wechat" style="width: 40%; object-fit: cover;">
  <img src="/alipay.jpg" alt="alipay" style="width: 40%; object-fit: cover;">
</p>

### 🚀 星路历程

[![Stargazers over time](https://starchart.cc/yaolifeng0629/del-repos.svg?variant=adaptive)](https://starchart.cc/yaolifeng0629/del-repos)
