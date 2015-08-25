/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var async = require("async");
var howdo = require('howdo');
var url = require("url");
var path = require("path");
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");

//图片上传模块
//var ItemProvider = require('.././ItemProvider').ItemProvider
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

//产品模块
var products = require("../../src/javaScripts/nodejs/models/index").products;
var productsDao = require("../../src/javaScripts/nodejs/dao/productsDao");
var newProductsDao = new productsDao(products);
var productsDaoBse = new daoBase(products);

exports.adminAllProductAjax = function(req,res,next){
    var title = req.query.title;
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize =10;
    var queryStr={};
    if(title==""||title==null){
        queryStr={};
    }else{
        var pattern = new RegExp("^.*"+title+".*$");
        queryStr.title = pattern;
    }

    async.auto({
        getCount:function(callback){
            productsDaoBse.countByQuery(queryStr,function(err,count){
                pageCount = parseInt(Math.ceil(count/pageSize));
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                callback(null,{"pageNo":pageNo,"pageCount":pageCount});
            });
        },
        getData:function(callback){
            productsDaoBse.findAllByPageAndQuery(queryStr,{createdTime:-1},pageNo,pageSize,function(err,products){
                callback(null,products);
            });
        },
        getImg:['getData',function(callback,result){
            var count= 0;
            result.getData.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getData.length) {
                        callback(null, result.getData);
                    }
                });
            })
        }]
    }, function(err, results) {
        res.json({'title':'产品展示','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'products':results.getData});
    });
}

//添加产品
exports.adminAddProductAjax = function(req,res,next){
    var product=req.body.product;
    product._id = uuid.v1();
    if(product.videosrc ==""||product.videosrc ==null){
        async.auto({
            getImgId: function (callback) {
                var fileProvider = new ImageFileProvider();
                fileProvider.insert(product.image, function (fileId) {
                    callback(null, fileId);
                });
            },
            addData: ["getImgId",function (callback, result) {
                product.image = result.getImgId;
                newProductsDao.save(product, function (data) {
                    callback(null, data);
                });
            }]
        }, function (err, results) {
            res.json(results.addData);
        });
    }else {
        async.auto({
            getImgId: function (callback) {
                var fileProvider = new ImageFileProvider();
                fileProvider.insert(product.image, function (fileId) {
                    callback(null, fileId);
                });
            },
            getVideoId: function (callback) {
                var fileProvider = new ImageFileProvider();
                fileProvider.insert(product.videosrc, function (fileId) {
                    callback(null, fileId);
                });
            },
            addData: ["getImgId", "getVideoId", function (callback, result) {
                product.image = result.getImgId;
                product.videosrc = result.getVideoId;
                newProductsDao.save(product, function (data) {
                    callback(null, data);
                });
            }]
        }, function (err, results) {
            res.json(results.addData);
        });
    }
}

//删除产品
exports.delProductAjax = function(req,res,next){
    var id=req.body.id;
    productsDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//更新产品
exports.updateProductAjax = function(req,res,next){
    var product=req.body.product;
    if(product.videosrc ==""||product.videosrc ==null){
        async.auto({
            getImgId:function(callback){
                var fileProvider = new ImageFileProvider();
                fileProvider.insert(product.image,function(fileId){
                    callback(null,fileId);
                });
            },
            setImgIdAndUpdateData:["getImgId",function(callback,result){
                var condition = {_id:product._id},
                    update = {$set: {image: result.getImgId,
                        title:product.title,
                        videosrc:product.videosrc,
                        websiteUrl:product.websiteUrl,
                        concat:product.concat
                    }},
                    options = {multi: true};
                productsDaoBse.update(condition,update,options,function(data){
                    if(data==null){
                        data={"msg":"1"}
                    }else{
                        data={"msg":"0"}
                    }
                    callback(null,data);
                })
            }]
        },function(err,results){
            res.json(results.setImgIdAndUpdateData);
        });
    }else{
        async.auto({
            getImgId: function (callback) {
                var fileProvider = new ImageFileProvider();
                fileProvider.insert(product.image, function (fileId) {
                    callback(null, fileId);
                });
            },
            getVideoId: function (callback) {
                var fileProvider = new ImageFileProvider();
                fileProvider.insert(product.videosrc, function (fileId) {
                    callback(null, fileId);
                });
            },
            addData: ["getImgId", "getVideoId", function (callback, result) {
                //product.image = result.getImgId;
                //product.videosrc = result.getVideoId;
                var condition = {_id:product._id},
                    update = {$set: {
                        image: result.getImgId,
                        title:product.title,
                        videosrc:result.getVideoId,
                        websiteUrl:product.websiteUrl,
                        concat:product.concat
                    }},
                    options = {multi: true};
                productsDaoBse.update(condition,update,options,function(data){
                    if(data==null){
                        data={"msg":"1"}
                    }else{
                        data={"msg":"0"}
                    }
                    callback(null,data);
                })
            }]
        }, function (err, results) {
            res.json(results.addData);
        });



    }
}

//根据id查询产品
exports.findProductById = function(req,res,next){
    var id=req.body.id;
    productsDaoBse.getById(id,function(err,product){
        var fileProvider = new ImageFileProvider();
        fileProvider.read(product.image,function(data){
           product.image=data;
            res.json(product);
        });
    })
}


