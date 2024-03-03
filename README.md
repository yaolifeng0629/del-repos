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

### Guide
步骤：
1.  生成token(在刚打开的页面中)
2.  打开 cmd 输入：del-util
3.  选择平台(默认github)
4.  输入token
5.  选择要删除的仓库(Enter键确认)
6.  等待删除完成
Tips:所填写的token仅作权限验证，无任何违规行为。使用完此工具后，也可自行手动删除对应的token
