/**
 * Created by Administrator on 2015/5/12.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

var daoBase = require("../src/javaScripts/dao/DaoBase");

//招聘模块
var recruitments = require("../src/javaScripts/models").recruitments;
var recruitmentsDaoBse = new daoBase(recruitments);
//var recruitmentsDao = require("../src/javaScripts/dao/recruitmentsDao");

exports.allRecruitmentAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var active = parseInt(req.query.active);
    var pageSize =10;
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
            recruitmentsDaoBse.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,allRecruitments){
                done(null,allRecruitments);
            });
        })
        .task(function(done){
            recruitmentsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,allRecruitmentsTitle){
                done(null,allRecruitmentsTitle);
            });
        })
        .together(function(err,pageNo,pageCount,allRecruitments,allRecruitmentsTitle){
            res.json({'title':'招聘','active':active,'pageNo':pageNo,'pageCount':pageCount,'allRecruitments':allRecruitments,'allRecruitmentsTitle':allRecruitmentsTitle});
        });
}

exports.recruitmentdetailAjax = function(req,res){
    var id = req.query.id;
    var active = req.query.active;
   howdo
        .task(function(done){
           recruitmentsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,allRecruitmentsTitle){
                done(null,allRecruitmentsTitle);
            });
        })
       .task(function(done){
           recruitmentsDaoBse.getById(id,function(err,recruitment){
               done(null,recruitment);
           })
       })
        .together(function(err,allRecruitmentsTitle,recruitment){
            res.json({'title':'职位内容','active':active,'allRecruitmentsTitle':allRecruitmentsTitle,'recruitment':recruitment});
        });

}