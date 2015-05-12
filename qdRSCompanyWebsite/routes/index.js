'use strict'

var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
//新闻模块
var news = require("../src/javaScripts/models").news;
var NewsDao = require("../src/javaScripts/dao/newsDao");
//我们的合作伙伴模块
var partners = require("../src/javaScripts/models").partners;
var PartnersDao = require("../src/javaScripts/dao/partnersDao");
//我们的产品模块
var products = require("../src/javaScripts/models").products;
var ProductsDao = require("../src/javaScripts/dao/productsDao");


exports.welcome = function(req,res){
    howdo
        .task(function(done){
            //最上边产品的图片
            ProductsDao.findByLimitAndSortAndQuery({$and:[{image:{$ne:""}},{smallImg:{$ne:""}}]},{createdTime:-1},4,function(err,productImg){
                done(null,productImg);
            });
        })
        .task(function(done){
            //我们的产品
            ProductsDao.findByLimitAndSort({createdTime:-1},6,function(err,products){
                done(null,products);
            });
        })
        .task(function(done){
            //新闻图片
            NewsDao.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},4,function(err,newsImg){
                done(null,newsImg);
            });
        })
        .task(function(done){
            //新闻标题
            NewsDao.findByLimitAndSort({createdTime:-1},12,function(err,news){
                done(null,news);
            });
        })
        .task(function(done){
            //合作伙伴
            PartnersDao.findByLimitAndSort({createdTime:-1},6,function(err,partners){
                done(null,partners);
            });
        })
        // 异步顺序并行
        .together(function(err,productImg,products,newsImg,news,partners){
            res.json({'productImg':productImg,'products':products,'newsImg':newsImg,'news':news,'partners':partners});
        });
}
