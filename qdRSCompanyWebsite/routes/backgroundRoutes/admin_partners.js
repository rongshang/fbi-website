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

//产品模块
var partners = require("../../src/javaScripts/nodejs/models/index").partners;
var partnersDao = require("../../src/javaScripts/nodejs/dao/partnersDao");
var newPartnersDao = new partnersDao(partners);
var partnersDaoBse = new daoBase(partners);

exports.adminAllPartner = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize =10;

    async.auto({
        getCount:function(callback){
            partnersDaoBse.countByQuery({},function(err,count){
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
            partnersDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,partners){
                callback(null,partners);
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
        res.json({'title':'合作伙伴','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'partners':results.getData});
    });
}

//添加合作伙伴
exports.adminAddPartnerAjax = function(req,res,next){
    var partner=req.body.partner;
    //product =JSON.parse(product);
    partner._id = uuid.v1();
    var fileProvider = new ImageFileProvider();
    fileProvider.insert(partner.image,function(fileId){
        if(fileId!=null&&fileId!=""){
            partner.image=fileId;
            newPartnersDao.save(partner,function(data){
                res.json(data);
            });
        }
    });
}

//删除合作伙伴
exports.delPartnerAjax = function(req,res,next){
    var id=req.query.id;
    partnersDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//更新合作伙伴
exports.updatePartnerAjax = function(req,res,next){
    var partner=req.body.partner;
    async.auto({
        getImgId:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(partner.image,function(fileId){
                callback(null,fileId);
            });
        },
        setImgIdAndUpdateData:["getImgId",function(callback,result){
            var condition = {_id:partner._id},
                update = {$set: {image:result.getImgId,
                    title:partner.title,
                    concat:partner.concat
                }},
                options = {multi: true};
            partnersDaoBse.update(condition,update,options,function(data){
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

//根据id查询合作伙伴
exports.findPartnerById = function(req,res,next){
    var id=req.body.id;
    partnersDaoBse.getById(id,function(err,partner){
        var fileProvider = new ImageFileProvider();
        fileProvider.read(partner.image,function(data){
            partner.image=data;
            res.json(partner);
        });
    })
}

