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

module.exports = NewsDAO;



