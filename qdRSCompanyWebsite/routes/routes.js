'use strict'

var index = require('./index');
var news = require('./news');
var products = require('./products');
var partners = require('./partners');
var recruitments = require('./recruitments');
var aboutus = require('./aboutus');
var contactus = require('./contactus');
var amdin = require('./admin_index');
var adminProduct = require('./admin_product');
var adminCompanyprofile = require('./admin_companyfile');
var adminEnterpriseculture = require('./admin_enterprisecultures');
var adminDevelopment = require('./admin_developments');

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
    //添加产品
    app.post('/adminAddProductAjax',adminProduct.adminAddProductAjax);
    //删除产品
    app.post('/delProductAjax',adminProduct.delProductAjax);
    //根据id查询产品
    app.post('/findProductById',adminProduct.findProductById)
    //更新产品
    app.post('/updateProductAjax',adminProduct.updateProductAjax);
    //查询所有的产品
    app.get('/adminAllProductAjax',adminProduct.adminAllProductAjax);
    //添加公司简介
    app.post('/adminAddCompanyprofileAjax',adminCompanyprofile.adminAddCompanyprofileAjax);
    //删除公司简介
    app.post('/delCompanyprofileAjax',adminCompanyprofile.delCompanyprofileAjax);
    //根据id查询公司简介
    app.post('/findCompanyprofileById',adminCompanyprofile.findCompanyprofileById)
    //更新公司简介
    app.post('/updateCompanyprofileAjax',adminCompanyprofile.updateCompanyprofileAjax);
    //查询全部公司简介
    app.get('/adminAllCompanyprofile',adminCompanyprofile.adminAllCompanyprofile);
    //添加企业文化
    app.post('/adminAddEnterprisecultureAjax',adminEnterpriseculture.adminAddEnterprisecultureAjax);
    //删除企业文化
    app.post('/delEnterprisecultureAjax',adminEnterpriseculture.delEnterprisecultureAjax);
    //根据id查询企业文化
    app.post('/findEnterprisecultureById',adminEnterpriseculture.findEnterprisecultureById)
    //更新企业文化
    app.post('/updateEnterprisecultureAjax',adminEnterpriseculture.updatEenterprisecultureAjax);
    //查询全部企业文化
    app.get('/adminAllEnterpriseculture',adminEnterpriseculture.adminAllEnterpriseculture);
    //添加发展历程
    app.post('/adminAddDevelopmentAjax',adminDevelopment.adminAddDevelopmentAjax);
    //删除发展历程
    app.post('/delDevelopmentAjax',adminDevelopment.delDevelopmentAjax);
    //根据id查询发展历程
    app.post('/findDevelopmentById',adminDevelopment.findDevelopmentById)
    //更新发展历程
    app.post('/updateDevelopmentAjax',adminDevelopment.updateDevelopmentAjax);
    //查询全部发展历程
    app.get('/adminAllDevelopment',adminDevelopment.adminAllDevelopment);

};