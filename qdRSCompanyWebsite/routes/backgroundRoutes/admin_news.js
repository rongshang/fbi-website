/**
 * Created by Administrator on 2015/8/21.
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

//新闻模块
var news = require("../../src/javaScripts/nodejs/models/index").news;
var newsDao = require("../../src/javaScripts/nodejs/dao/newsDao");
var newNewsDao = new newsDao(news);
var newsDaoBse = new daoBase(news);

exports.adminAllNews = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize =10;

    async.auto({
        getCount:function(callback){
            newsDaoBse.countByQuery({},function(err,count){
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
            newsDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,news){
                callback(null,news);
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
        res.json({'title':'合作伙伴','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'news':results.getData});
    });
}

//添加新闻
exports.adminAddNewsAjax = function(req,res,next){
    var news=req.body.news;
    news._id = uuid.v1();
    var fileProvider = new ImageFileProvider();
    fileProvider.insert(news.image,function(fileId){
        if(fileId!=null&&fileId!=""){
            news.image=fileId;
            newNewsDao.save(news,function(data){
                res.json(data);
            });
        }
    });
}

//删除新闻
exports.delNewsAjax = function(req,res,next){
    var id=req.query.id;
    newsDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//更新新闻
exports.updateNewsAjax = function(req,res,next){
    var news=req.body.news;
    async.auto({
        getImgId:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(news.image,function(fileId){
                callback(null,fileId);
            });
        },
        setImgIdAndUpdateData:["getImgId",function(callback,result){
            var condition = {_id:news._id},
                update = {$set: {image: result.getImgId,
                    title:news.title,
                    concat:news.concat
                }},
                options = {multi: true};
            newsDaoBse.update(condition,update,options,function(data){
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
}

//根据id查询新闻
exports.findNewsById = function(req,res,next){
    var id=req.body.id;
    newsDaoBse.getById(id,function(err,news){
        var fileProvider = new ImageFileProvider();
        fileProvider.read(news.image,function(data){
            news.image=data;
            res.json(news);
        });
    })
}
