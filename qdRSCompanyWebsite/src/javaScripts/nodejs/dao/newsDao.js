/**
 * Created by Administrator on 2015/4/22.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    NewsModel = models.news;

var NewsDAO = function(news) {
    this.news=news ||{};
};


NewsDAO.prototype.save = function(news,callback){
    var newsModel = new NewsModel(news);
    newsModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}


module.exports = NewsDAO;



