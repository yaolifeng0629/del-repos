# del-repos Skills

This directory contains the `del-repos` agent skill. It helps an AI coding agent prepare and supervise the interactive `del-repos` CLI without treating irreversible repository deletion as an automatic action.

## Install

Install from the published GitHub repository for Codex:

```bash
npx skills add yaolifeng0629/del-repos --skill del-repos --global --agent codex
```

Omit `--global` to install the skill for the current project instead of the user account. Replace `codex` with another supported agent, such as `claude-code`, when appropriate.

To install from a clone of this repository on PowerShell, run this command from the repository root. The absolute path is required because the installer can otherwise treat a relative path as a Git repository address.

```powershell
npx skills add "$(Get-Location)\skills" --skill del-repos --global --agent codex
```

Use `npx skills add yaolifeng0629/del-repos --list` to inspect available skills before installing. The installer may offer a symlink or a copy; a symlink keeps the installed skill aligned with its source checkout.

## Use

After installation, ask your agent to use `del-repos` while preparing a GitHub or Gitee repository deletion. The skill requires the agent to establish the platform, scope, credential-storage choice, and exact target repositories before it invokes the interactive CLI. It also requires explicit final approval after the selected repositories are displayed.

The skill does not replace the CLI. Install the CLI separately with `npm install --global del-repos` (or another supported package manager), then run `del-repos` in an interactive terminal.
