/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");

//图片上传模块
//var ItemProvider = require('.././ItemProvider').ItemProvider
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;
//var itemProvider = new ItemProvider('localhost', 27017);
var fileProvider = new ImageFileProvider('localhost', 27017);

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
    howdo
        .task(function(done){
            productsDaoBse.countByQuery(queryStr,function(err,count){
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
            productsDaoBse.findAllByPageAndQuery(queryStr,{createdTime:-1},pageNo,pageSize,function(err,products){
                done(null,products);
            });

        })
        .together(function(err,pageNo,pageCount,products){
            res.json({'title':'产品展示','pageNo':pageNo,'pageCount':pageCount,'products':products});
        });
}

//添加产品
exports.adminAddProductAjax = function(req,res,next){
    var product=req.query.product;
    product =JSON.parse(product);
    product._id = uuid.v1();
    console.log("====product.image===="+product.image);
    fileProvider.insert(product.image,function(fileId){
        if(fileId!=null&&fileId!=""){
            product.image=fileId;
            newProductsDao.save(product,function(data){
                res.json(data);
            });
        }
    });


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
    var condition = {_id:product._id},
        update = {$set: {image: product.image,
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
        res.json(data);
    })
}

//根据id查询产品
exports.findProductById = function(req,res,next){
    var id=req.body.id;
    productsDaoBse.getById(id,function(err,product){
        fileProvider.read(product.image,function(data){
           product.image=data;
            res.json(product);
        });

    })
}


