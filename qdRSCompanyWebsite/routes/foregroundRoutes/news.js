/**
 * Created by Administrator on 2015/5/7.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');

//图片处里
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//新闻模块
var news = require("../../src/javaScripts/nodejs/models/index").news;
var newsDaoBse = new daoBase(news);
//var newsDao = require("../src/javaScripts/dao/newsDao");


//全部新闻
exports.allnewsAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 10;
    async.auto({
        getCount:function(callback){
            newsDaoBse.countByQuery({},function(err,count){
                pageCount = Math.ceil(count/pageSize);
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                callback(null,{"pageNo":pageNo,"pageCount":pageCount});
            });
        },
        getAllNews:function(callback){
            newsDaoBse.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,news){
                callback(null,news);
            });
        },
        getTop3News:function(callback){
            newsDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,news){
                callback(null,news);
            });
        },
        getTop3NewsImg:["getTop3News",function(callback,result){
            var count= 0;
            result.getTop3News.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getTop3News.length) {
                        callback(null, result.getTop3News);
                    }
                });
            })
        }]
    },function(err,results){
        res.json({'title':'新闻中心','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'allNews':results.getAllNews,'newsImgs':results.getTop3NewsImg});
    });
}

//新闻详细内容
exports.newsdetailAjax = function(req,res){
    var newsid = req.query.newsid;
    async.auto({
        getNews:function(callback){
            newsDaoBse.getById(newsid,function(err,news){
                callback(null,news);
            });
        },
        getNewsImg:["getNews",function(callback,result){
            var fileProvider = new ImageFileProvider();
            fileProvider.read(result.getNews.image,function(data){
                result.getNews.image = data;
                callback(null,result.getNews);
            });
        }]
    },function(err,results){
        res.json(results.getNewsImg);
    });
}