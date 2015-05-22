/**
 * Created by Administrator on 2015/5/14.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

var daoBase = require("../src/javaScripts/dao/DaoBase");

//产品模块
var products = require("../src/javaScripts/models").products;
var productsDaoBse = new daoBase(products);
//var productsDao = require("../src/javaScripts/dao/productsDao");

//公司简介模块
var companyprofiles = require("../src/javaScripts/models").companyprofiles;
var companyprofilesDaoBse = new daoBase(companyprofiles);
//var companyprofilesDao = require("../src/javaScripts/dao/companyprofilesDao");

//企业文化模块
var enterprisecultures = require("../src/javaScripts/models").enterprisecultures;
var enterpriseculturesDaoBse = new daoBase(enterprisecultures);
//var enterpriseculturesDao = require("../src/javaScripts/dao/enterpriseculturesDao");

//发展历程模块
var developments = require("../src/javaScripts/models").developments;
var developmentsDaoBse = new daoBase(developments);
//var developmentsDao = require("../src/javaScripts/dao/developmentsDao");

//资质荣誉模块
var honors = require("../src/javaScripts/models").honors;
var honorsDaoBse = new daoBase(honors);
//var honorsDao = require("../src/javaScripts/dao/honorsDao");

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
            res.json({'title':'我们的产品','productsTitle':productsTitle,'companyprofiles':companyprofiles});
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
            res.json({'title':'我们的产品','productsTitle':productsTitle,'enterprisecultures':enterprisecultures});
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
            res.json({'title':'我们的产品','productsTitle':productsTitle,'developments':developments});
        })
}

//资质荣誉
exports.honor = function(req,res){
    howdo
        .task(function(done){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            honorsDaoBse.findBySort({'createdTime':-1},function(err,honors){
                done(null,honors);
            })
        })
        .together(function(err,productsTitle,honors){
            res.json({'title':'我们的产品','productsTitle':productsTitle,'honors':honors});
        })
}