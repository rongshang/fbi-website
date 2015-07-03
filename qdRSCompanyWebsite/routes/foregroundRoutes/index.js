'use strict'

var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//新闻模块
var news = require("../../src/javaScripts/nodejs/models/index").news;
var newsDaoBse = new daoBase(news);

//我们的合作伙伴模块
var partners = require("../../src/javaScripts/nodejs/models/index").partners;
var partnersDaoBse = new daoBase(partners);

//我们的产品模块
var products = require("../../src/javaScripts/nodejs/models/index").products;
var productsDaoBse = new daoBase(products);

//联系我们模块
var contactus = require("../../src/javaScripts/nodejs/models/index").contactus;
var contactusDaoBse = new daoBase(contactus);

//风云人物
var figures = require("../../src/javaScripts/nodejs/models/index").figures;
var figuresDaoBse = new daoBase(figures);

//首页
exports.index = function(req,res){
    //联系我们
    contactusDaoBse.findOneBySort({createdTime:-1},function(err,contactus){
        res.render('foregroundModule/index',{'contactus':contactus});
    });
}

exports.welcome = function(req,res){
    howdo
        .task(function(done){
            //我们的产品
            productsDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,products){
                done(null,products);
            });
        })
        .task(function(done){
            //风云人物
            figuresDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,figures){
                done(null,figures);
            });
        })
        .task(function(done){
            //新闻标题
            newsDaoBse.findByLimitAndSort({createdTime:-1},10,function(err,news){
                done(null,news);
            });
        })
        .task(function(done){
            //合作伙伴
            partnersDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},5,function(err,partners){
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
        .together(function(err,products,figures,news,partners,contactus){
            res.json({'products':products,'figures':figures,'news':news,'partners':partners,'contactus':contactus});
        });
}
