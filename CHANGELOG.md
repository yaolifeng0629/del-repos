## 📦 Latest Updates (v1.2.0)

-   ✨ **Enhanced CLI Experience**: Improved user prompts and visual feedback
-   🔍 **Search Functionality**: Added `inquirer-search-checkbox` for better repository filtering
-   ✅ **Confirmation Steps**: Additional safety checks before repository deletion
-   🔄 **Improved Spinner**: Better visual feedback during operations
-   🛠️ **Error Handling**: Comprehensive error reporting and operation summaries
-   💾 **Token Management**: Option to save tokens for future use

## 📦 v1.1.2

-   You can install the `1.1.2-alpha.0` version to experience it
-   add Option:

    -   `-t`, `o/a` get repositories type, default value `a` `(o: owner，a: all)`

-   How to specify the acquisition repositories type：

```sh
# get all personal repositories
del-repos -t o

# Get all repositories (including collaborators and organization member repositories)
del-repos
# or
del-repos -t a
```

## 📦 v1.1.1

-   Fixed problem that cannot be deleted.

## 📦 v1.0.13

-   The warehouse list is displayed as: Owner/warehouse name
-   Add quick access warehouse entrance

## 📦 v1.0.0

-   Major update! del-repos version 1.0.0 released!
-   Support both GitHub and Gitee
-   Refactor the framework to replace JavaScript with TypeScript
-   New interface, more friendly
