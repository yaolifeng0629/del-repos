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

<p align="center"><img src="screen.gif" width="90%" alt="del-repos interactive terminal"></p>

`del-repos` is an interactive CLI for selecting and permanently deleting GitHub or Gitee repositories in batches. It supports searchable multi-selection, repository-scope filtering, locally saved tokens, and per-repository results.

> [!WARNING]
> Repository deletion is irreversible. This tool has no dry-run or non-interactive deletion mode. Back up anything important, review the printed repository list, and approve deletion only when the exact targets are correct.

## Install the CLI

### Prerequisites

- Node.js 14 or newer
- An interactive terminal
- A personal access token for GitHub or Gitee with permission to delete the repositories you select

Install globally with one package manager:

```bash
npm install --global del-repos
pnpm add --global del-repos
yarn global add del-repos
```

For a one-off run without global installation:

```bash
npx del-repos
```

Verify the installation:

```bash
del-repos --version
del-repos --help
```

## Use the CLI

Start the interactive flow:

```bash
del-repos
```

The CLI will:

1. Ask you to choose GitHub or Gitee.
2. Open the matching token-creation page when no saved token is available.
3. Fetch repositories, using the selected scope.
4. Let you search and select repositories. Type to search, use Space to toggle, then press Enter.
5. Print the selected repository names and ask for final confirmation.
6. Delete each selected repository sequentially and print a summary of successes and failures.

### Options

| Option | Meaning |
| --- | --- |
| `-v`, `--version` | Print the installed version. |
| `-h`, `--help` | Show command help. |
| `-t`, `--type <o\|a>` | Fetch `o` (owner) repositories or `a` (all accessible) repositories. Default: `a`. |
| `--clear-token` | Clear both saved platform token values. |

Examples:

```bash
del-repos --type o
del-repos --type a
del-repos --clear-token
```

`owner` is the focused choice for deleting repositories owned by the signed-in account. `all` asks the platform API for all accessible repositories, including collaborator and organization repositories. Being listed does not guarantee deletion: the current CLI sends deletion requests under the authenticated username, so collaborator and organization repositories may fail even when they are visible in the picker.

## Tokens and local data

The CLI opens these pages when it needs a token:

- GitHub: the classic personal-access-token page with `repo`, `delete_repo`, and `project` scopes preselected.
- Gitee: the personal-access-token page. Grant repository deletion permission.

When you choose to save a token, the CLI writes it as plain JSON to `<home>/.del-repos/config.json`, with separate `github_token` and `gitee_token` fields. Treat this file as a credential: do not commit, share, or back it up insecurely. `del-repos --clear-token` replaces the saved values with `{}`; it does not delete the configuration file.

## Agent skill

This repository also contains a `del-repos` agent skill. It helps Codex and compatible agents prepare an intentional deletion run, protect tokens, and require explicit approval after the final repository list is shown.

Install it globally for Codex:

```bash
npx skills add yaolifeng0629/del-repos --skill del-repos --global --agent codex
```

Install it only for the current project by omitting `--global`. Full instructions are in [skills/README.md](skills/README.md).

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| `401`, `403`, `Unauthorized`, or `Forbidden` | Clear saved values with `del-repos --clear-token`, create a new token with the required permissions, then re-run and review the repository selection again. |
| No repositories appear | Confirm the selected platform, token permissions, account, and repository scope. |
| A repository is listed but deletion fails | Confirm that the authenticated account owns it and has deletion rights. This is common for collaborator or organization repositories selected through `--type a`. |
| Some deletions fail | Read each per-repository result and the final counts. The CLI continues after a failure, so the final completion message is not proof that every selected repository was deleted. |

## Development

```bash
git clone https://github.com/yaolifeng0629/del-repos.git
cd del-repos
pnpm install
pnpm lint
pnpm build
pnpm dev
```

`pnpm lint` runs the TypeScript compiler check. `pnpm build` emits the CLI to `dist/`, and `pnpm dev` rebuilds then runs that local output. This repository currently has no automated test script; run type checking and a controlled interactive smoke test before submitting a change.

## Contributing

Open an issue for defects or proposals, and send focused pull requests with matching documentation changes. Do not include credentials, repository inventories, or destructive-operation output containing private URLs in issues or pull requests.

## License

ISC. See [LICENSE](LICENSE).
