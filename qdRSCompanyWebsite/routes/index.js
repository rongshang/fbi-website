'use strict'

var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

var daoBase = require("../src/javaScripts/dao/DaoBase");
//新闻模块
var news = require("../src/javaScripts/models").news;
var newsDaoBse = new daoBase(news);
//var NewsDao = require("../src/javaScripts/dao/newsDao");

//我们的合作伙伴模块
var partners = require("../src/javaScripts/models").partners;
var partnersDaoBse = new daoBase(partners);
//var PartnersDao = require("../src/javaScripts/dao/partnersDao");

//我们的产品模块
var products = require("../src/javaScripts/models").products;
var productsDaoBse = new daoBase(products);
//var ProductsDao = require("../src/javaScripts/dao/productsDao");

//联系我们模块
var contactus = require("../src/javaScripts/models").contactus;
var contactusDaoBse = new daoBase(contactus);
//var contactusDao = require("../src/javaScripts/dao/contactusDao");

//首页
exports.index = function(req,res){
    //联系我们
    contactusDaoBse.findOneBySort({createdTime:-1},function(err,contactus){
        res.render('index',{'contactus':contactus});
    });
}

exports.welcome = function(req,res){
    howdo
        .task(function(done){
            //最上边产品的图片
            productsDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},4,function(err,productImg){
                done(null,productImg);
            });
        })
        .task(function(done){
            //我们的产品
            productsDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},6,function(err,products){
                done(null,products);
            });
        })
        .task(function(done){
            //新闻图片
            newsDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},4,function(err,newsImg){
                done(null,newsImg);
            });
        })
        .task(function(done){
            //新闻标题
            newsDaoBse.findByLimitAndSort({createdTime:-1},9,function(err,news){
                done(null,news);
            });
        })
        .task(function(done){
            //合作伙伴
            partnersDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},2,function(err,partners){
                done(null,partners);
            });
        })
        .task(function(done){
            //联系我们
            contactusDaoBse.findOneBySort({createdTime:-1},function(err,contactus){
                done(null,contactus);
            });
        })
        // 异步顺序并行
        .together(function(err,productImg,products,newsImg,news,partners,contactus){
            res.json({'productImg':productImg,'products':products,'newsImg':newsImg,'news':news,'partners':partners,'contactus':contactus});
        });
}
