/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
var when=require('when');

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    UserinfosModel = models.userinfos;

var UserinfosDAO = function(userinfo) {
    this.userinfo=userinfo ||{};
};

//登陆
UserinfosDAO.prototype.findUserInfoByUsernameAndPassword = function(req,res,userinfo,callback){
    UserinfosModel.findOne({username:userinfo.username,password:userinfo.password},function(err,userinfo){
        callback(userinfo);
    });
}

//添加用户
UserinfosDAO.prototype.save = function(userinfo,callback){
    var userinfoModel = new UserinfosModel(userinfo);
    var deferred = when.defer();
    //this.getUserinfoByUsername(userinfo.username,function(user){
    //    if(user){
    //        return callback({msg:'0'});
    //    }else{
    //        return callback({msg:'2'});
    //    }
    //});

    userinfoModel.save(function(err){
        if (err){
            deferred.reject(err);
            //return callback({msg:'2'});
        }else{
            deferred.resolve(null);
        }
        return deferred.promise;
        //return callback({msg:'1'});
    });
}

//根据用户名查找
UserinfosDAO.prototype.getUserinfoByUsername = function(username){
    UserinfosModel.findOne({username:username},function(err,userinfo){
        var deferred = when.defer();
        if (err){
            deferred.reject(err);
        }else{
            deferred.resolve(userinfo);
        }
        return deferred.promise;
    });
}

module.exports = UserinfosDAO;

