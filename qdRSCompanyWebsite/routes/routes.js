'use strict'

var index = require('./index');
var news = require('./news');
var products = require('./products');
var partners = require('./partners');

module.exports = function (app) {
    app.get('/welcome',index.welcome);
    app.get('/allnewsAjax',news.allnewsAjax);
    app.get('/newsdetailAjax',news.newsdetailAjax);
    app.get('/productdetailAjax',products.productdetailAjax);
    app.get('/allPartnersAjax',partners.allPartnersAjax);
};