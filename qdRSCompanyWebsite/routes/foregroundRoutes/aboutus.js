/**
 * Created by Administrator on 2015/5/14.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");

//图片处理
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

//产品模块
var products = require("../../src/javaScripts/nodejs/models/index").products;
var productsDaoBse = new daoBase(products);

//公司简介模块
var companyprofiles = require("../../src/javaScripts/nodejs/models/index").companyprofiles;
var companyprofilesDaoBse = new daoBase(companyprofiles);

//企业文化模块
var enterprisecultures = require("../../src/javaScripts/nodejs/models/index").enterprisecultures;
var enterpriseculturesDaoBse = new daoBase(enterprisecultures);

//发展历程模块
var developments = require("../../src/javaScripts/nodejs/models/index").developments;
var developmentsDaoBse = new daoBase(developments);

//资质荣誉模块
var honors = require("../../src/javaScripts/nodejs/models/index").honors;
var honorsDaoBse = new daoBase(honors);

//公司简介
exports.companyprofile = function(req,res){
    howdo
        .task(function(done){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            companyprofilesDaoBse.findByLimitAndSortAndQuery({},{'createdTime':-1},1,function(err,companyprofiles){
                done(null,companyprofiles);
            })
        })
        .together(function(err,productsTitle,companyprofiles){
            res.json({'title':'公司简介','productsTitle':productsTitle,'companyprofiles':companyprofiles});
        })
}

//企业文化
exports.enterpriseculture = function(req,res){
    howdo
        .task(function(done){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            enterpriseculturesDaoBse.findByLimitAndSortAndQuery({},{'createdTime':-1},1,function(err,enterprisecultures){
                done(null,enterprisecultures);
            })
        })
        .together(function(err,productsTitle,enterprisecultures){
            res.json({'title':'企业文化','productsTitle':productsTitle,'enterprisecultures':enterprisecultures});
        })
}

//发展历程
exports.development = function(req,res){
    howdo
        .task(function(done){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            developmentsDaoBse.findByLimitAndSortAndQuery({},{'createdTime':-1},1,function(err,developments){
                done(null,developments);
            })
        })
        .together(function(err,productsTitle,developments){
            res.json({'title':'发展历程','productsTitle':productsTitle,'developments':developments});
        })
}

//资质荣誉
exports.honor = function(req,res){
    async.auto({
        getProductsTitle:function(callback){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                callback(null,productsTitle);
            });
        },
        getHonors:function(callback){
            honorsDaoBse.findBySort({'createdTime':-1},function(err,honors){
                callback(null,honors);
            })
        },
        getHonorImg:["getHonors",function(callback,result){
            var count = 0;
            result.getHonors.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getHonors.length) {
                        callback(null, result.getHonors);
                    }
                });
            })
        }]
    },function(err,results){
        res.json({'title':'资质荣誉','productsTitle':results.getProductsTitle,'honors':results.getHonorImg});

    });
}