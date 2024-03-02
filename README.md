# delete-repository-util

### Func
-   Github: `@octokit/rest`
    -   [ ] Delete Singer or Multi Repository
    -   [ ] Command line interaction

-   Gitee:
    -   [ ]


### Step
1.  Get Token: https://github.com/settings/tokens/new?scopes=delete_repo,repo&description=Repo%20Remover%20Token


### Npm Package
1.  octokit:
    -   Github: https://github.com/octokit/octokit.js/#readme
2.  @octokit/rest


### TODO：
1.  将所有仓库列为一个列表，让用户进行多选，对已选择进行删除
2.  提示正在删除的第几个、或在终端中显示删除的进度
3.  最后进行二次确认删除，把已选择的repo列出来
4.  最后在删除
