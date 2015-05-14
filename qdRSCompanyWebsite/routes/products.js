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

//产品的详细内容
exports.productdetailAjax = function(req,res){
    var productid = req.query.productid;
    howdo
        .task(function(done){
            productsDao.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .task(function(done){
            productsDao.getById(productid,function(err,products){
                done(null,products);
            });
        })
        .together(function(err,productsTitle,products){
            res.json({'title':'产品中心','productid':productid,'productsTitle':productsTitle,'products':products});
        })

}

//全部产品
exports.allProductAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
    howdo
        .task(function(done){
            productsDao.countByQuery({},function(err,count){
                pageCount = parseInt(Math.ceil(count/pageSize));
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                done(null,pageNo,pageCount);
            });
        })
        .task(function(done){
            productsDao.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,allProducts){
                done(null,allProducts);
            });
        })
        .task(function(done){
            productsDao.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                done(null,productsTitle);
            });
        })
        .together(function(err,pageNo,pageCount,allProducts,productsTitle){
            res.json({'title':'我们的产品','pageNo':pageNo,'pageCount':pageCount,'allProducts':allProducts,'productsTitle':productsTitle});
        });

}