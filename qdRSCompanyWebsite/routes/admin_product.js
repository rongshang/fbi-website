/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
//产品模块
var products = require("../src/javaScripts/models").products;
var productsDao = require("../src/javaScripts/dao/productsDao");
var newProductsDao = new productsDao(products);
var daoBase = require("../src/javaScripts/dao/DaoBase");
var productsDaoBse = new daoBase(products);


exports.adminAllProductAjax = function(req,res,next){
    var title = req.query.title.trim;
    var title="";
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
    howdo
        .task(function(done){
            productsDaoBse.countByQuery({},function(err,count){
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
            if(title==""||title==null){
                productsDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,products){
                    done(null,products);
                });
            }else{
                productsDaoBse.findAllByPageAndQuery({title:/title/i},{createdTime:-1},pageNo,pageSize,function(err,products){
                    done(null,products);
                });
            }
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
