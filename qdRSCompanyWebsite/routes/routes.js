'use strict'

var index = require('./index');
var news = require('./news');
var products = require('./products');
var partners = require('./partners');
var recruitments = require('./recruitments');
var aboutus = require('./aboutus');
var contactus = require('./contactus');
var amdin = require('./admin_index');

module.exports = function (app) {
    //标题页面
    app.get('/',index.index);
    //首页
    app.get('/welcome',index.welcome);
    //新闻
    app.get('/allnewsAjax',news.allnewsAjax);
    //新闻详细内容
    app.get('/newsdetailAjax',news.newsdetailAjax);
    //产品
    app.get('/allProductAjax',products.allProductAjax)
    //产品详细内容
    app.get('/productdetailAjax',products.productdetailAjax);
    //合作伙伴
    app.get('/allPartnersAjax',partners.allPartnersAjax);
    //招聘
    app.get('/allRecruitmentAjax',recruitments.allRecruitmentAjax);
    //职位详细内容
    app.get('/recruitmentdetailAjax',recruitments.recruitmentdetailAjax);
    //公司简介
    app.get('/companyprofile',aboutus.companyprofile);
    //企业文化
    app.get('/enterpriseculture',aboutus.enterpriseculture);
    //公司发展历程
    app.get('/development',aboutus.development);
    //资质荣誉
    app.get('/honor',aboutus.honor);
    //联系我们
    app.get('/contactus',contactus.contactus);
////////////////////////////////////////////////////////////////////////////
    //后台页面
    app.get('/admin',amdin.index);

};