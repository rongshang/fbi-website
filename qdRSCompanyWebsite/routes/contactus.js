/**
 * Created by Administrator on 2015/5/7.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

//产品模块
var products = require("../src/javaScripts/models").products;
var productsDao = require("../src/javaScripts/dao/productsDao");
//联系我们模块
var contactus = require("../src/javaScripts/models").contactus;
var contactusDao = require("../src/javaScripts/dao/contactusDao");

exports.contactus = function(req,res){
    howdo
        .task(function(done){
            productsDao.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            contactusDao.findByLimitAndSortAndQuery({},{createdTime:-1},1,function(err,contactus){
               console.log("====contactus====="+contactus);
                done(null,contactus);
            });
        })
        .together(function(err,productsTitle,contactus){
            res.json({'title':'我们的产品','productsTitle':productsTitle,'contactus':contactus});
        })

}