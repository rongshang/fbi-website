linux����������rswebsite  rswebsite
��Ŀ·����/home/rswebsite
��Ŀ����qdRSCompanyWebsite
���ݿ⣺rswebsite(������root�û���¼)
���������û���sa   sa
rswebsite����û��� rswebsite   rswebsite
���ݿ�·����/usr/local/mongodb/(root�û���)

��װnodejs��������̨��������������
    װ     npm install -g forever 
   ����    forever start server.js
   ֹͣ    forever stop
   �鿴    forever list
���磺forever start /home/rswebsite/qdRSCompanyWebsite/bin/www


����mongoDB
  /usr/local/mongodb/mongodb/bin/mongod --dbpath=/usr/local/mongodb/data/  --fork --logpath=/usr/local/mongodb/log/mongodb.log --logappend --auth
ע�⣺��forkһ��Ҫ��logpath
  
�ر�mongoDB

   > use admin
switched to db admin
   > db.shutdownServer();
server should be down...