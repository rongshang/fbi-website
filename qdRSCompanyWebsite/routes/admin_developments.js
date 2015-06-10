/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../src/javaScripts/dao/DaoBase");
//发展历程
var developments = require("../src/javaScripts/models").developments;
var developmentsDao = require("../src/javaScripts/dao/developmentsDao");
var newDevelopmentsDao = new developmentsDao(developments);
var developmentsDaoBse = new daoBase(developments);

//查询全部发展历程
exports.adminAllDevelopment = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
    howdo
        .task(function(done){
            developmentsDaoBse.countByQuery({},function(err,count){
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
            developmentsDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,developments){
                done(null,developments);
            });
        })
        .together(function(err,pageNo,pageCount,developments){
            res.json({'title':'发展历程','pageNo':pageNo,'pageCount':pageCount,'developments':developments});
        });
}

//更新发展历程
exports.updateDevelopmentAjax = function(req,res,next){
    var development=req.body.development;
    var condition = {_id:development._id},
        update = {$set: {concat:development.concat}},
        options = {multi: true};
    developmentsDaoBse.update(condition,update,options,function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//根据id查询发展历程
exports.findDevelopmentById = function(req,res,next){
    var id=req.body.id;
    developmentsDaoBse.getById(id,function(err,development){
        res.json(development);
    })
}

//删除发展历程
exports.delDevelopmentAjax = function(req,res,next){
    var id=req.body.id;
    developmentsDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//添加发展历程
exports.adminAddDevelopmentAjax = function(req,res,next){
    var development=req.query.development;
    development =JSON.parse(development);
    development._id = uuid.v1();
    newDevelopmentsDao.save(development,function(data){
        res.json(data);
    });
}