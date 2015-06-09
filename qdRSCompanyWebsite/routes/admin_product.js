/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../src/javaScripts/dao/DaoBase");

//产品模块
var products = require("../src/javaScripts/models").products;
var productsDao = require("../src/javaScripts/dao/productsDao");
var newProductsDao = new productsDao(products);
var productsDaoBse = new daoBase(products);

exports.adminAllProductAjax = function(req,res,next){
    var title = req.query.title;
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
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
            res.json({'title':'我们的产品','pageNo':pageNo,'pageCount':pageCount,'products':products});
        });
    //console.log("11111111111111----"+JSON.stringify(req.files));
    //var product=req.body.product;
    //console.log("++++++++++++"+product);
    //product =JSON.parse(product);
    //product._id = uuid.v1();
    //if(req.files.name!=undefined){
    //    product.image = '/upload/images/'+req.files.name;
    //}
    //newProductsDao.save(product,function(data){
    //    res.json(data);
    //});
}

//添加产品
exports.adminAddProductAjax = function(req,res,next){
    //console.log("11111111111111----"+JSON.stringify(req.files));
    var product=req.query.product;
    product =JSON.parse(product);
    product._id = uuid.v1();
    //if(req.files.name!=undefined){
    //    product.image = '/upload/images/'+req.files.name;
    //}
    newProductsDao.save(product,function(data){
        res.json(data);
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
        res.json(product);
    })
}


