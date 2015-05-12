/**
 * Created by Administrator on 2015/5/7.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

//图片模块
var news = require("../src/javaScripts/models").news;
var newsDao = require("../src/javaScripts/dao/newsDao");

//全部新闻
exports.allnewsAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 10;
    howdo
        .task(function(done){
            newsDao.countByQuery({},function(err,count){
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
            newsDao.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,news){
                done(null,news);
            });
        })
        .together(function(err,pageNo,pageCount,news){
            res.json({'title':'新闻中心','pageNo':pageNo,'pageCount':pageCount,'allNews':news});
        });
}

//新闻详细内容
exports.newsdetailAjax = function(req,res){
    var newsid = req.query.newsid;
        newsDao.getById(newsid,function(err,news){
            res.json(news);
        });
}