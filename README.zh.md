<h1 align="center">del-repos</h1>

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.zh.md">中文</a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/del-repos?style=flat-square&logo=npm" alt="npm version">
  <img src="https://img.shields.io/npm/dt/del-repos?style=flat-square&logo=npm" alt="npm downloads">
  <img src="https://img.shields.io/github/license/yaolifeng0629/del-repos?style=flat-square" alt="license">
  <img src="https://img.shields.io/node/v/del-repos?style=flat-square&logo=node.js" alt="node version">
</p>

<p align="center"><img src="screen.png" width="90%"/></p>

## ⚡ 介绍

`del-repos` 是一个功能强大的命令行工具，用于批量删除 GitHub 或 Gitee 仓库，提供直观的交互式界面。

## 🛠️ 功能特性

- 🌐 **多平台支持**：同时支持 `GitHub` 和 `Gitee` 平台
- 🔍 **智能搜索**：高级搜索功能，快速查找仓库
- ✅ **批量选择**：交互式复选框界面，支持多选
- 🔐 **令牌管理**：安全的令牌存储和自动验证
- 🎯 **仓库筛选**：可选择个人仓库或所有可访问仓库
- 💾 **配置持久化**：保存令牌供未来使用
- 🎨 **丰富界面**：彩色输出，进度指示器和加载动画
- ⚠️ **安全优先**：多重确认步骤，防止意外删除
- 📊 **详细反馈**：全面的错误处理和操作摘要

## 🚀 安装

### 前提条件

- 已安装 `Node.js` v14.0.0 或更高版本
- 可从 [Node.js 官网](https://nodejs.org/) 下载安装

### 安装步骤

使用 npm 或 pnpm 全局安装：

```bash
# 使用 npm
npm install del-repos -g

# 使用 pnpm
pnpm install del-repos -g

# 使用 yarn
yarn global add del-repos
```

## 📋 命令行选项

| 选项 | 说明 |
|------|------|
| `-v`, `--version` | 显示当前版本 |
| `-h`, `--help` | 显示帮助信息 |
| `-t <type>` | 仓库类型筛选（`o`: 个人，`a`: 全部） |

### 仓库类型筛选示例

```bash
# 仅获取个人拥有的仓库
del-repos -t o

# 获取所有可访问的仓库（默认）
# （包括协作者和组织成员仓库）
del-repos
# 或
del-repos -t a
```
## 🌟 使用方法

### 快速开始

只需运行以下命令即可启动交互式删除流程：

```bash
del-repos
```

### 详细步骤

1. **🚀 平台选择**
   - 选择 `GitHub` 或 `Gitee` 平台
   - 工具提供清晰的交互式选择界面

2. **🔑 令牌认证**
   - 输入所选平台的个人访问令牌
   - 工具会自动在浏览器中打开令牌生成页面
   - **所需权限：**
     - **GitHub**：`delete_repo`、`project`、`repo`
     - **Gitee**：仓库删除权限
   - 可选择安全保存令牌以供将来使用

3. **📦 仓库发现**
   - 工具会显示加载动画，获取您的仓库列表
   - 显示找到的仓库总数
   - 支持按仓库类型筛选（个人拥有 vs. 所有可访问）

4. **🔍 智能仓库选择**
   - **搜索功能**：实时输入筛选仓库
   - **批量选择**：使用空格键选择/取消选择仓库
   - **编号列表**：带编号的仓库列表便于导航
   - **视觉反馈**：清晰指示已选择的仓库

5. **⚠️ 安全确认**
   - **危险区警告**：明确指示操作的破坏性
   - **仓库审查**：列出所有将被删除的仓库
   - **最终确认**：删除前需要明确确认

6. **🗑️ 删除过程**
   - 实时进度更新和加载动画
   - 详细的错误处理和报告
   - 完成后的成功摘要

## ⚠️ 重要注意事项

### 🚨 安全警告

- **⚠️ 不可逆操作**：删除的仓库**无法**恢复
- **🔍 仔细检查**：始终验证您即将删除的仓库
- **🔐 令牌安全**：保持访问令牌安全，切勿共享
- **📝 备份**：考虑在删除前备份重要仓库

### 🔑 令牌要求

#### GitHub 令牌权限
- `delete_repo` - 仓库删除所需
- `project` - 项目板访问权限
- `repo` - 完整仓库访问权限

#### Gitee 令牌权限
- 必须启用仓库删除权限

### 🛠️ 故障排除

如果遇到问题，请检查：
- ✅ 您的网络连接稳定
- ✅ 您的令牌具有所需权限
- ✅ 平台 API 可访问
- ✅ 您拥有必要的仓库访问权限

如需更多帮助或报告错误，请[提交 Issue](https://github.com/yaolifeng0629/del-repos/issues)

## 🙌 贡献

我们欢迎所有的贡献和建议！如果您想为 `del-repos` 做出贡献，请按以下步骤：

### 开发环境设置

1. **克隆仓库：**
   ```bash
   git clone https://github.com/yaolifeng0629/del-repos.git
   cd del-repos
   ```

2. **安装依赖：**
   ```bash
   npm install
   # 或
   pnpm install
   ```

3. **开发和测试：**
   ```bash
   npm run dev
   # 或
   pnpm dev
   ```

4. **构建项目：**
   ```bash
   npm run build
   ```

### 如何贡献

- 🐛 **报告错误**：通过[创建 Issue](https://github.com/yaolifeng0629/del-repos/issues) 报告问题
- 💡 **建议功能**：通过 Issue 讨论提出功能建议
- 🔧 **提交 PR**：为错误修复或新功能提交拉取请求
- 📖 **改进文档**：帮助其他用户改进文档
- ⭐ **点赞仓库**：如果觉得有用请给仓库点星

### 开发指南

- 遵循现有的代码风格和约定
- 为新功能添加测试
- 必要时更新文档
- 提交 PR 前确保所有测试通过

**感谢所有帮助改进 `del-repos` 的贡献者！** 🎉

## 📦 最新更新 (v1.1.3)

- ✨ **增强 CLI 体验**：改进的用户提示和视觉反馈
- 🔍 **搜索功能**：添加 `inquirer-search-checkbox` 以更好地筛选仓库
- ✅ **确认步骤**：仓库删除前的额外安全检查
- 🔄 **改进加载动画**：操作期间更好的视觉反馈
- 🛠️ **错误处理**：全面的错误报告和操作摘要
- 💾 **令牌管理**：可选择保存令牌供将来使用

## ⭐ 支持项目

如果您觉得这个工具有帮助，请考虑：

- **⭐ 给仓库点星**：在 [GitHub](https://github.com/yaolifeng0629/del-repos) 上点星
- **📣 分享给他人**：推荐给可能受益的其他人
- **🐛 报告问题**：帮助改进工具
- **🔧 参与贡献**：让它变得更好

您的支持是持续开发的动力！

## 📊 星路历程

[![Stargazers over time](https://starchart.cc/yaolifeng0629/del-repos.svg?variant=adaptive)](https://starchart.cc/yaolifeng0629/del-repos)

## 📄 许可证

本项目采用 ISC 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。
