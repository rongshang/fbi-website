'use strict'

var howdo = require('howdo');
var async = require('async');
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

//图片处里
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

//首页
exports.index = function(req,res){
    //联系我们
    async.auto({
        getOneBySort:function(callback){
            contactusDaoBse.findOneBySortAndLimit({createdTime:-1},function(err,contactus){
                callback(null,contactus);
            });
        },
        getLogo:["getOneBySort",function(callback,result){
            var fileProvider = new ImageFileProvider();
            fileProvider.read(result.getOneBySort.logo,function(data){
                result.getOneBySort.logo = data;
                callback(null,result.getOneBySort);
            })
        }],
        getCodeImg:["getLogo","getOneBySort",function(callback,result){
            var fileProvider = new ImageFileProvider();
            fileProvider.read(result.getLogo.codeImg,function(data){
                result.getLogo.codeImg = data;
                callback(null,result.getLogo);
            })
        }]
    },function(err,results){
        res.render('foregroundModule/index',{'contactus':results.getCodeImg});
    });

    //contactusDaoBse.findOneBySort({createdTime:-1},function(err,contactus){
    //    var fileProvider = new ImageFileProvider();
    //    fileProvider.read(contactus.logo,function(data){
    //        console.log("======logo===="+data);
    //        contactus.logo = data;
    //    })
    //    res.render('foregroundModule/index',{'contactus':contactus});
    //});
}

exports.welcome = function(req,res){
    async.auto({
        //产品信息
        getProducts:function(callback){
            productsDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,products){
                callback(null,products);
            });
        },
        //产品图片
        getProductImg:["getProducts",function(callback,result){
            var count = 0;
            result.getProducts.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getProducts.length) {
                        callback(null, result.getProducts);
                    }
                });
            });
        }],
        //风云人物
        getFigures:function(callback){
            figuresDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,figures){
                callback(null,figures);
            });
        },
        //风云人物图片
        getFigureImg:["getFigures",function(callback,result){
            var count = 0;
            result.getFigures.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getFigures.length) {
                        callback(null, result.getFigures);
                    }
                });
            });
        }],
        //新闻标题
        getNewsTitle:function(callback){
            newsDaoBse.findByLimitAndSort({createdTime:-1},10,function(err,news){
                callback(null,news);
            });
        },
        //合作伙伴
        getPartners:function(callback){
            partnersDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},5,function(err,partners){
                callback(null,partners);
            });
        },
        //合作伙伴图片
        getPartnerImg:["getPartners",function(callback,result){
            var count = 0;
            result.getPartners.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getPartners.length) {
                        callback(null, result.getPartners);
                    }
                });
            });
        }],
        //联系我们
        getContactus:function(callback){
            contactusDaoBse.findOneBySort({createdTime:-1},function(err,contactus){
                callback(null,contactus);
            });
        }
    },function(err,result){
        res.json({'products':result.getProductImg,'figures':result.getFigureImg,'news':result.getNewsTitle,'partners':result.getPartnerImg,'contactus':result.getContactus});
    });
}
