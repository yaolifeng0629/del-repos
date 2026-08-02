---
name: del-repos
description: Manage a deliberate bulk-repository deletion with the del-repos CLI when a user wants to remove GitHub or Gitee repositories, clean saved CLI tokens, or prepare a deletion run.
---

# Del-Repos

Use this skill for the `del-repos` CLI. Its leading word is **deliberate**: inspect the exact target set, keep credentials private, and obtain an explicit final authorization before an irreversible action.

## 1. Establish the operation

Determine all of the following before invoking a deletion command:

- Platform: GitHub or Gitee.
- Scope: `owner` for repositories owned by the authenticated account, or `all` for repositories returned by the platform API.
- Whether the user wants to save the token locally.
- The exact repositories the user intends to remove.

State that the CLI is interactive and has no dry-run or non-interactive deletion mode. It lists repositories, lets the user select them, prints the selected names, and asks for one final confirmation. Completion criterion: the user has supplied an unambiguous final approval for the displayed target names and platform.

## 2. Prepare the CLI

Check whether `del-repos` is available. If it is absent, install it with one of these commands:

```bash
npm install --global del-repos
pnpm add --global del-repos
yarn global add del-repos
```

For a one-off execution, use `npx del-repos` instead of installing globally. The CLI requires Node.js 14 or newer and an interactive terminal.

Use one of these commands:

```bash
del-repos                 # all repositories returned by the API (default)
del-repos --type o        # only repositories owned by the authenticated account
del-repos --type a        # explicit default
del-repos --clear-token   # clear saved GitHub and Gitee token values
```

Completion criterion: the requested command and scope match the user's intent.

## 3. Handle credentials deliberately

Let the CLI open the relevant token page and prompt for the token. Do not ask the user to paste a token into a chat, command line, issue, or log.

- GitHub: this CLI opens the classic personal-access-token page with `repo`, `delete_repo`, and `project` scopes preselected.
- Gitee: create a personal access token with repository deletion permission.
- A saved token is plain JSON at `<home>/.del-repos/config.json`; save it only with the user's approval. `--clear-token` replaces the saved values with an empty object and does not remove the configuration file.

Completion criterion: authentication can proceed without exposing a token, and any local persistence choice is explicit.

## 4. Select and authorize

During the interactive picker, search the fetched list, use Space to toggle repositories, and press Enter to submit the selection. Read the printed selected names back against the user's intended set.

Treat `--type a` as a discovery scope, not a deletion guarantee. The current implementation performs deletion under the authenticated username, so collaborator and organization repositories can be listed but may fail to delete. Require a final confirmation after the CLI displays the exact selected list; do not substitute an earlier general request for this approval.

Completion criterion: the exact selected repositories have been reviewed and the final confirmation is affirmative.

## 5. Report the result

Record the per-repository outcomes and the final success/failure counts. The CLI continues after individual failures, so the concluding celebratory message alone is not proof that every requested deletion succeeded.

For `401`, `403`, `Unauthorized`, or `Forbidden`, clear saved tokens with `del-repos --clear-token`, create a token with the required permissions, and retry only after the user reauthorizes the same target set. For other failures, preserve the affected repository names and API error messages for follow-up.

Completion criterion: every selected repository is accounted for as deleted, failed, or cancelled, with no ambiguous outcome.
