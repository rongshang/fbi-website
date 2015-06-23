/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//招贤纳士
var recruitments = require("../../src/javaScripts/nodejs/models/index").recruitments;
var recruitmentsDao = require("../../src/javaScripts/nodejs/dao/recruitmentsDao");
var newRecruitmentsDao = new recruitmentsDao(recruitments);
var recruitmentsDaoBse = new daoBase(recruitments);

//查询全部招贤纳士
exports.adminAllRecruitment = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
    howdo
        .task(function(done){
            recruitmentsDaoBse.countByQuery({},function(err,count){
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
            recruitmentsDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,recruitments){
                done(null,recruitments);
            });
        })
        .together(function(err,pageNo,pageCount,recruitments){
            res.json({'title':'招贤纳士','pageNo':pageNo,'pageCount':pageCount,'recruitments':recruitments});
        });
}

//更新招贤纳士
exports.updateRecruitmentAjax = function(req,res,next){
    var recruitment=req.body.recruitment;
    var condition = {_id:recruitment._id},
        update = {$set:
                        {job:recruitment.job
                        ,count:recruitment.count
                        ,address:recruitment.address
                        ,salary:recruitment.salary
                        ,concat:recruitment.concat
                        ,tel:recruitment.tel
                        ,email:recruitment.email
                        ,treatment:recruitment.treatment

                        }
                 },
        options = {multi: true};

    recruitmentsDaoBse.update(condition,update,options,function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//根据id查询招贤纳士
exports.findRecruitmentById = function(req,res,next){
    var id=req.body.id;
    recruitmentsDaoBse.getById(id,function(err,recruitment){
        res.json(recruitment);
    })
}

//删除招贤纳士
exports.delRecruitmentAjax = function(req,res,next){
    var id=req.body.id;
    recruitmentsDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//添加招贤纳士
exports.adminAddRecruitmentAjax = function(req,res,next){
    var recruitment=req.query.recruitment;
    recruitment =JSON.parse(recruitment);
    recruitment._id = uuid.v1();
    newRecruitmentsDao.save(recruitment,function(data){
        res.json(data);
    });
}