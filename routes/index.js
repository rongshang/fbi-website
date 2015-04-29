'use strict'

var express = require('express');
var router = express.Router();
var path = require('path');
var NewsDao = require("../src/javaScripts/dao/newsDao");
var ImagesDao = require("../src/javaScripts/dao/imagesDao");
var news = require("../src/javaScripts/models").news;
var images = require("../src/javaScripts/models").images;

exports.welcome = function(req,res,next){
  //最上边的图片
  ImagesDao.getAll(function(err,images){
      res.json(images);
  });

}

exports.news = function(req,res,next){
  //新闻
  NewsDao.getAll(function(err,news){
    res.json(news);
  });

}