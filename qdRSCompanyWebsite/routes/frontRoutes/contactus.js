/**
 * Created by Administrator on 2015/5/7.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");

//产品模块
var products = require("../../src/javaScripts/nodejs/models/index").products;
var productsDaoBse = new daoBase(products);
//var productsDao = require("../src/javaScripts/dao/productsDao");

//联系我们模块
var contactus = require("../../src/javaScripts/nodejs/models/index").contactus;
var contactusDaoBse = new daoBase(contactus);

exports.contactus = function(req,res){
    howdo
        .task(function(done){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            contactusDaoBse.findOneBySort({createdTime:-1},function(err,contactus){
                done(null,contactus);
            });
        })
        .together(function(err,productsTitle,contactus){
            res.json({'title':'我们的产品','productsTitle':productsTitle,'contactus':contactus});
        })

}