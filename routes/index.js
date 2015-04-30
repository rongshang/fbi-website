'use strict'

var howdo = require('howdo');
var express = require('express');
var router = express.Router();
var path = require('path');
var NewsDao = require("../src/javaScripts/dao/newsDao");
var ImagesDao = require("../src/javaScripts/dao/imagesDao");
var news = require("../src/javaScripts/models").news;
var images = require("../src/javaScripts/models").images;

exports.welcome = function(req,res){
    howdo
        .task(function(done){
            //最上边的图片
            ImagesDao.getAll(function(err,images){
                console.log("========"+images);
                done(null,images);
            });
        })
        .task(function(done){
            //新闻
            NewsDao.getAll(function(err,news){
                done(null,news);
            })
        })
        // 异步顺序并行
        .together(function(err,images,news){
            res.json({'news':news,'images':images});
        });
}
