/**
 * Created by Administrator on 2015/7/13.
 */


var uuid = require("uuid");
var fs = require("fs");
var async = require("async");
var howdo = require('howdo');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//资质荣誉
var honor = require("../../src/javaScripts/nodejs/models/index").honors;
var honorDao = require("../../src/javaScripts/nodejs/dao/honorsDao");
//图片处理
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

var newHonorDao = new honorDao(honor);
var honorDaoBse = new daoBase(honor);

//查询全部资质荣誉
exports.adminAllHonor = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 6;
    async.auto({
        getCount:function(callback){
            honorDaoBse.countByQuery({},function(err,count){
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
            honorDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,honors){
                callback(null,honors);
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
        res.json({'title':'资质荣誉','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'honors':results.getData});
    });
}

//更新资质荣誉
exports.updateHonorAjax = function(req,res,next){
    var honor=req.body.honor;
    async.auto({
        getImgId:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(honor.image,function(fileId){
                callback(null,fileId);
            });
        },
        setImgIdAndUpdateData:["getImgId",function(callback,result){
            var condition = {_id:honor._id},
                update = {$set: {image:result.getImgId}},
                options = {multi: true};
            honorDaoBse.update(condition,update,options,function(data){
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

//根据id查询资质荣誉
exports.findHonorById = function(req,res,next){
    var id=req.body.id;
    honorDaoBse.getById(id,function(err,honor){
        var fileProvider = new ImageFileProvider();
        fileProvider.read(honor.image,function(data){
            honor.image=data;
            res.json(honor);
        });
    })
}

//删除资质荣誉
exports.delHonorAjax = function(req,res,next){
    var id=req.query.id;
    honorDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//添加资质荣誉
exports.adminAddHonorAjax = function(req,res,next){
    var honor =req.body.honor;
    honor._id = uuid.v1();
    var fileProvider = new ImageFileProvider();
    fileProvider.insert(honor.image,function(fileId){
        if(fileId!=null&&fileId!=""){
            honor.image=fileId;
            newHonorDao.save(honor,function(data){
                res.json(data);
            });
        }
    });
}