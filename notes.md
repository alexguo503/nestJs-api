# Nest-Api 项目

## 重点事宜

- 使用 Git 管理整个项目过程
 
  新建
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/alexguo503/nestJs-api.git
    git push -u origin main // 首次上传

  更新
    git add . // 提交更新暂存区
    git commit -m "update" // 提交更新本地仓库
    git branch -M main // 选择 main 分支
    git push // 提交更新远程 github 仓库

- add SwaggerUi & REST-auth 分支 - REST / GraphQL / Microservice / WebSockets 可选
  1. nest g resource auth --no-spec // 不含测试文件
  2. auth dto

- password 加密 by bcryptJs

- jwt token 注册登录 by passport-jwt




## 注意事项:


## 遗留问题:

