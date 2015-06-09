/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../src/javaScripts/dao/DaoBase");
//企业文化
var enterprisecultures = require("../src/javaScripts/models").enterprisecultures;
var enterpriseculturesDao = require("../src/javaScripts/dao/enterpriseculturesDao");
var newEnterpriseculturesDao = new enterpriseculturesDao(enterprisecultures);
var enterpriseculturesDaoBse = new daoBase(enterprisecultures);

//查询全部企业文化
exports.adminAllEnterpriseculture = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
    howdo
        .task(function(done){
            enterpriseculturesDaoBse.countByQuery({},function(err,count){
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
            enterpriseculturesDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,enterprisecultures){
                done(null,enterprisecultures);
            });
        })
        .together(function(err,pageNo,pageCount,enterprisecultures){
            res.json({'title':'企业文化','pageNo':pageNo,'pageCount':pageCount,'enterprisecultures':enterprisecultures});
        });
}

//更新企业文化
exports.updatEenterprisecultureAjax = function(req,res,next){
    var enterpriseculture=req.body.enterpriseculture;
    var condition = {_id:enterpriseculture._id},
        update = {$set: {concat:enterpriseculture.concat}},
        options = {multi: true};
    enterpriseculturesDaoBse.update(condition,update,options,function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//根据id查询企业文化
exports.findEnterprisecultureById = function(req,res,next){
    var id=req.body.id;
    enterpriseculturesDaoBse.getById(id,function(err,enterpriseculture){
        res.json(enterpriseculture);
    })
}

//删除企业文化
exports.delEnterprisecultureAjax = function(req,res,next){
    var id=req.body.id;
    enterpriseculturesDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//添加企业文化
exports.adminAddEnterprisecultureAjax = function(req,res,next){
    var enterpriseculture=req.query.enterpriseculture;
    enterpriseculture =JSON.parse(enterpriseculture);
    enterpriseculture._id = uuid.v1();
    newEnterpriseculturesDao.save(enterpriseculture,function(data){
        res.json(data);
    });
}