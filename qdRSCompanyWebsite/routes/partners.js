/**
 * Created by Administrator on 2015/5/11.
 */
var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');

var daoBase = require("../src/javaScripts/dao/DaoBase");
//合作伙伴模块
var partners = require("../src/javaScripts/models").partners;
var partnersDaoBse = new daoBase(partners);
var partnersDao = require("../src/javaScripts/dao/partnersDao");

exports.allPartnersAjax = function(req,res){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 5;
    howdo
        .task(function(done){
            partnersDaoBse.countByQuery({},function(err,count){
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
            partnersDaoBse.findAllByPage({createdTime:-1},pageNo,pageSize,function(err,allPartners){
                done(null,allPartners);
            });
        })
        .task(function(done){
            //合作伙伴图片
            partnersDaoBse.findByLimitAndSortAndQuery({image:{$ne:""}},{createdTime:-1},3,function(err,partnerImgs){
                done(null,partnerImgs);
            });
        })
        .together(function(err,pageNo,pageCount,allPartners,partnerImgs){
            res.json({'title':'我们的伙伴','pageNo':pageNo,'pageCount':pageCount,'allPartners':allPartners,'partnerImgs':partnerImgs});
        });
}