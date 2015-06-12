/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../src/javaScripts/dao/DaoBase");
//公司简介
var companyprofiles = require("../src/javaScripts/models").companyprofiles;
var companyprofilesDao = require("../src/javaScripts/dao/companyprofilesDao");
var newCompanyprofilesDao = new companyprofilesDao(companyprofiles);
var companyprofilesDaoBse = new daoBase(companyprofiles);

//查询全部公司简介
exports.adminAllCompanyprofile = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
    howdo
        .task(function(done){
            companyprofilesDaoBse.countByQuery({},function(err,count){
                pageCount = parseInt(Math.ceil(count/pageSize));
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                done(null,pageNo,pageCount);
            });
        })
        .task(function(done){
            companyprofilesDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,companyprofiles){
                done(null,companyprofiles);
            });
        })
        .together(function(err,pageNo,pageCount,companyprofiles){
            res.json({'title':'公司简介','pageNo':pageNo,'pageCount':pageCount,'companyprofiles':companyprofiles});
        });
}

//更新公司简介
exports.updateCompanyprofileAjax = function(req,res,next){
    var companyprofile=req.body.companyprofile;
    var condition = {_id:companyprofile._id},
        update = {$set: {concat:companyprofile.concat}},
        options = {multi: true};
    companyprofilesDaoBse.update(condition,update,options,function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//根据id查询公司简介
exports.findCompanyprofileById = function(req,res,next){
    var id=req.body.id;
    companyprofilesDaoBse.getById(id,function(err,companyprofile){
        res.json(companyprofile);
    })
}

//删除公司简介
exports.delCompanyprofileAjax = function(req,res,next){
    var id=req.body.id;
    companyprofilesDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//添加公司简介
exports.adminAddCompanyprofileAjax = function(req,res,next){
    var companyprofile=req.query.companyprofile;
    companyprofile =JSON.parse(companyprofile);
    companyprofile._id = uuid.v1();
    newCompanyprofilesDao.save(companyprofile,function(data){
        res.json(data);
    });
}