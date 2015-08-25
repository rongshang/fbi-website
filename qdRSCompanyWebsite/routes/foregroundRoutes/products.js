/**
 * Created by Administrator on 2015/5/11.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');

//图片处理
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//产品详细内容模块
var products = require("../../src/javaScripts/nodejs/models/index").products;
var productsDaoBse = new daoBase(products);
//产品的详细内容
exports.productdetailAjax = function(req,res){
    var productid = req.query.productid;
    async.auto({
        getProductsTitle:function(callback){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                callback(null,productsTitle);
            });
        },
        getProductById:function(callback){
            productsDaoBse.getById(productid,function(err,product){
                callback(null,product);
          });
        },
        getProductVideo:["getProductById",function(callback,result){
            var fileProvider = new ImageFileProvider();
            if(result.getProductById.videosrc==""||result.getProductById.videosrc==null||result.getProductById.videosrc===undefined){
                callback(null,result.getProductById);
            }else{
                fileProvider.read(result.getProductById.videosrc,function(data){
                    result.getProductById.videosrc = data;
                    callback(null,result.getProductById);
                });
            }
        }]
    },function(err,results){
        res.json({'title':'产品中心','productid':productid,'productsTitle':results.getProductsTitle,'products':results.getProductVideo});
    });
}

//全部产品
exports.allProductAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;

    async.auto({
        getCount:function(callback){
            productsDaoBse.countByQuery({},function(err,count){
                pageCount = parseInt(Math.ceil(count/pageSize));
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                callback(null,{"pageNo":pageNo,"pageCount":pageCount});
            });
        },
        getProducts:function(callback){
            productsDaoBse.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,allProducts){
                callback(null,allProducts);
            });
        },
        getProductImg:["getProducts",function(callback,result){
            var count= 0;
            result.getProducts.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getProducts.length) {
                        callback(null, result.getProducts);
                    }
                });
            })
        }],
        getProductsTitle:function(callback){
            productsDaoBse.findByLimitAndSortAndQuery({},{createdTime:-1},8,function(err,productsTitle){
                callback(null,productsTitle);
            });
        }
    },function(err,results){
        res.json({'title':'我们的产品','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'allProducts':results.getProductImg,'productsTitle':results.getProductsTitle});

    });
}