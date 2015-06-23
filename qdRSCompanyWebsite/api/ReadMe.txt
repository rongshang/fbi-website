linux服务器名：rswebsite  rswebsite
项目路径：/home/rswebsite
项目名：qdRSCompanyWebsite
数据库：rswebsite(必须容root用户登录)
超级管理用户：sa   sa
rswebsite库的用户： rswebsite   rswebsite
数据库路径：/usr/local/mongodb/(root用户下)

安装nodejs服务器后台启动和启动方法
    装     npm install -g forever 
   启动    forever start server.js
   停止    forever stop
   查看    forever list
例如：forever start /home/rswebsite/qdRSCompanyWebsite/bin/www


启动mongoDB
  /usr/local/mongodb/mongodb/bin/mongod --dbpath=/usr/local/mongodb/data/  --fork --logpath=/usr/local/mongodb/log/mongodb.log --logappend --auth
注意：有fork一定要有logpath
  
关闭mongoDB

   > use admin
switched to db admin
   > db.shutdownServer();
server should be down...