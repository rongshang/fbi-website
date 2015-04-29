/**
 * Created by Administrator on 2015/4/22.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    NewsModel = models.news;

var NewsDAO = function(news) {
    this.news=news ||{};
};
module.exports = NewsDAO;

var NewsDao = new DaoBase(NewsModel);

module.exports = NewsDao;
//var daoBase = new DaoBase(this.news);
//NewsDAO.prototype.findAll = function(callback){
//    var newsModel = new NewsModel(this.news);
//    //daoBase.getAll(callback);
//
//    console.log("======aaqqqqq========="+newsModel);
//}

