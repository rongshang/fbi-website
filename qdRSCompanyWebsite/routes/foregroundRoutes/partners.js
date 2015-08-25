/**
 * Created by Administrator on 2015/5/11.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');

//图片处里
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;

var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//合作伙伴模块
var partners = require("../../src/javaScripts/nodejs/models/index").partners;
var partnersDaoBse = new daoBase(partners);

exports.allPartnersAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 5;
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
        getPartners:function(callback){
            partnersDaoBse.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,allPartners){
                callback(null,allPartners);
            });
        },
        getPartnerImg:["getPartners",function(callback,result){
            //合作伙伴图片
            var count= 0;
            result.getPartners.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getPartners.length) {
                        callback(null, result.getPartners);
                    }
                });
            })
        }],
        //左侧的3个图片
        getTop3Partners:function(callback){
            partnersDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,partnerImgs){
                callback(null,partnerImgs);
            });
        },
        getTop3PartnersImg:["getTop3Partners",function(callback,result){
            var count= 0;
            result.getTop3Partners.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.image,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.image = data;
                    if (count === result.getTop3Partners.length) {
                        callback(null, result.getTop3Partners);
                    }
                });
            })
        }]
    },function(err,results){
        res.json({'title':'我们的伙伴','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'allPartners':results.getPartnerImg,'partnerImgs':results.getTop3PartnersImg});
    });
}