/**
 * Created by Administrator on 2015/5/11.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

//合作伙伴模块
var partners = require("../src/javaScripts/models").partners;
var partnersDao = require("../src/javaScripts/dao/partnersDao");

exports.allPartnersAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 10;
    howdo
        .task(function(done){
            partnersDao.countByQuery({},function(err,count){
                pageCount = Math.ceil(count/pageSize);
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                done(null,pageNo,pageCount);
            });
        })
        .task(function(done){
            partnersDao.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,parents){
                done(null,parents);
            });
        })
        .together(function(err,pageNo,pageCount,news){
            res.json({'title':'我们的伙伴','pageNo':pageNo,'pageCount':pageCount,'allParents':parents});
        });
}