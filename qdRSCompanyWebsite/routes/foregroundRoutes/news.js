/**
 * Created by Administrator on 2015/5/7.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//图片模块
var news = require("../../src/javaScripts/nodejs/models/index").news;
var newsDaoBse = new daoBase(news);
//var newsDao = require("../src/javaScripts/dao/newsDao");


//全部新闻
exports.allnewsAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 10;
    howdo
        .task(function(done){
            newsDaoBse.countByQuery({},function(err,count){
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
            newsDaoBse.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,news){
                done(null,news);
            });
        })
        .task(function(done){
            //新闻图片
            newsDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,newsImgs){
                done(null,newsImgs);
            });
        })
        .together(function(err,pageNo,pageCount,news,newsImgs){
            res.json({'title':'新闻中心','pageNo':pageNo,'pageCount':pageCount,'allNews':news,'newsImgs':newsImgs});
        });
}

//新闻详细内容
exports.newsdetailAjax = function(req,res){
    var newsid = req.query.newsid;
    newsDaoBse.getById(newsid,function(err,news){
            res.json(news);
        });
}