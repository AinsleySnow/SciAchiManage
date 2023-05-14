# 教科研成果统计系统
乱写的。  

增删改查好烦哦。

# 启动方法
启动前需要先安装 Node.js 和 Django，并配置好环境变量。方法请自行百度。  

之后解压 backend 文件夹里的 db.7z。  

再之后在项目根目录下运行下面的命令：  

```shell
# 后端
cd backend
python3 manage.py runserver

# 前端；在新 shell 中运行
cd frontend
npm start
```

**都开起来之后**，访问 http://localhost:3000/my 。因为主页根本没做。连重定向都没做。（不过真的有人会运行吗 ^_^）  

# 许可证
MIT 许可证。
前端的部分代码来自 MUI 仓库中的示例模板。
（不过真的会有人用这个吗。实现代码可是乱得要死哦。）
