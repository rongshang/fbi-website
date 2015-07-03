/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    UserinfosModel = models.userinfos;

var UserinfosDAO = function(userinfo) {
    this.userinfo=userinfo ||{};
};

//登陆
UserinfosDAO.prototype.findUserInfoByUsernameAndPassword = function(username,password){
    UserinfosModel.findOne({username:username,password:password},function(err,userinfo){
        if (err)
            return res.json({msg:err});
        if (!userinfo) {
            return res.json({msg:'用户名或密码错误'});
        }
        req.session["userinfo"] = userinfo;
        res.json(userinfo);

    });
}

//退出
exports.logout = function (req, res) {
    req.session["userinfo"] = null;
    var html = path.normalize(__dirname + '/../views/index.html');
    res.sendfile(html);
};


module.exports = UserinfosDAO;

