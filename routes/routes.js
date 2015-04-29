'use strict'

var index = require('./index');
var news = require('./news');
module.exports = function (app) {
    app.get('/welcome',index.welcome);
    app.get('/news',index.news);
};