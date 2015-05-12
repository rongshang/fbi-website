/**
 * Created by Administrator on 2015/5/11.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
//产品详细内容模块
var products = require("../src/javaScripts/models").products;
var productsDao = require("../src/javaScripts/dao/productsDao");

exports.productdetailAjax = function(req,res){
    var productid = req.query.productid;
    howdo
        .task(function(done){
            productsDao.findBySort({createdTime:-1},function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            productsDao.getById(productid,function(err,products){
                done(null,products);
            });
        })
        .together(function(err,productsTitle,products){
            res.json({'productid':productid,'productsTitle':productsTitle,'products':products});
        })

}
