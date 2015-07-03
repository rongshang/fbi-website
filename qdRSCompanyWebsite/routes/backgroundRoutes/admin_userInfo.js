/**
 * Created by Administrator on 2015/7/1.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//招贤纳士
var userinfos = require("../../src/javaScripts/nodejs/models/index").userinfos;
var userinfosDao = require("../../src/javaScripts/nodejs/dao/userinfosDao");
var newUserinfosDao = new userinfosDao(userinfos);
var userinfosDaoBse = new daoBase(userinfos);

//登陆页面
exports.loginHTML = function(req,res,next){
    res.render('backgroundModule/userinfo/admin_login');

}
//登陆功能
exports.login = function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    newUserinfosDao.findUserInfoByUsernameAndPassword(username,password)
}
