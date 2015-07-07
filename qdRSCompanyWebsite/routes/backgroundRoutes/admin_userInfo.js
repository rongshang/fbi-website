/**
 * Created by Administrator on 2015/7/1.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var promise = require('promise');

var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//用户信息
var userinfos = require("../../src/javaScripts/nodejs/models/index").userinfos;
var userinfosDao = require("../../src/javaScripts/nodejs/dao/userinfosDao");
var newUserinfosDao = new userinfosDao(userinfos);
var userinfosDaoBse = new daoBase(userinfos);

//登陆页面
exports.loginHTML = function(req,res,next){
    res.render('backgroundModule/userinfo/admin_login');
}
//退出
exports.logout = function(req,res,next){
    req.session.userinfo=null;
    res.render('backgroundModule/userinfo/admin_login');
}

//添加用户
exports.addAdmin = function(req,res,next){
    var userinfo =JSON.parse(req.query.userinfo);
    userinfo._id = uuid.v1();
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(userinfo.password);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    userinfo.password = crypto.createHash("md5").update(str).digest("hex");
    promise.then(function(){
        console.log("============");
        return newUserinfosDao.getUserinfoByUsername(userinfo.username);
    }).then(function(result){
        console.log("==result==="+result);
       if(result){
           res.json({msg:'0'});
       }else{
           newUserinfosDao.save(userinfo, function (datas) {
               return res.json(datas);
           });
       }

    })

}
//登陆功能
exports.adminLogin = function(req,res,next){
    var userinfo=JSON.parse(req.query.userinfo);
    var Buffer = require("buffer").Buffer;
    var buf = new Buffer(userinfo.password);
    var str = buf.toString("binary");
    var crypto = require("crypto");
    userinfo.password = crypto.createHash("md5").update(str).digest("hex");
    newUserinfosDao.findUserInfoByUsernameAndPassword(req,res,userinfo,function(userinfo){
        if(userinfo==null){
            res.json({msg:"1"});
        }else if(userinfo!=null){
            req.session.userinfo=userinfo;
            res.json({msg:"2"});
        }else{
            res.json({msg:"0"});
        }
    })
}
