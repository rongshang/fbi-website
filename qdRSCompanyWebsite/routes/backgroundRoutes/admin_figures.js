/**
 * Created by Administrator on 2015/8/20.
 */

var uuid = require("uuid");
var fs = require("fs");
var async = require("async");
var howdo = require('howdo');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//风云人物
var figure = require("../../src/javaScripts/nodejs/models/index").figures;
var figureDao = require("../../src/javaScripts/nodejs/dao/figuresDao");
//图片处理
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

var newFigureDao = new figureDao(figure);
var figureDaoBse = new daoBase(figure);

//查询全部风云人物
exports.adminAllFigure = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 6;
    async.auto({
        getCount:function(callback){
            figureDaoBse.countByQuery({},function(err,count){
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
            figureDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,figures){
                callback(null,figures);
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
        res.json({'title':'风云人物','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'figures':results.getData});
    });
}

//更新风云人物
exports.updateFigureAjax = function(req,res,next){
    var figure=req.body.figure;
    async.auto({
        getImgId:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(figure.image,function(fileId){
                callback(null,fileId);
            });
        },
        setImgIdAndUpdateData:["getImgId",function(callback,result){
            var condition = {_id:figure._id},
                update = {$set: {image:result.getImgId,name:figure.name,job:figure.job,honor:figure.honor}},
                options = {multi: true};
            figureDaoBse.update(condition,update,options,function(data){
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

//根据id查询风云人物
exports.findFigureById = function(req,res,next){
    var id=req.body.id;
    figureDaoBse.getById(id,function(err,figure){
        var fileProvider = new ImageFileProvider();
        fileProvider.read(figure.image,function(data){
            figure.image=data;
            res.json(figure);
        });
    })
}

//删除风云人物
exports.delFigureAjax = function(req,res,next){
    var id=req.query.id;
    figureDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//添加风云人物
exports.adminAddFigureAjax = function(req,res,next){
    var figure =req.body.figure;
    figure._id = uuid.v1();
    var fileProvider = new ImageFileProvider();
    fileProvider.insert(figure.image,function(fileId){
        if(fileId!=null&&fileId!=""){
            figure.image=fileId;
            newFigureDao.save(figure,function(data){
                res.json(data);
            });
        }
    });
}