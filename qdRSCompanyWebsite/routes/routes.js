'use strict'

var index = require('./foregroundRoutes/index');
var news = require('./foregroundRoutes/news');
var products = require('./foregroundRoutes/products');
var partners = require('./foregroundRoutes/partners');
var recruitments = require('./foregroundRoutes/recruitments');
var aboutus = require('./foregroundRoutes/aboutus');
var contactus = require('./foregroundRoutes/contactus');
var amdin = require('./backgroundRoutes/admin_index');
var adminProduct = require('./backgroundRoutes/admin_product');
var adminCompanyprofile = require('./backgroundRoutes/admin_companyprofiles');
var adminEnterpriseculture = require('./backgroundRoutes/admin_enterprisecultures');
var adminDevelopment = require('./backgroundRoutes/admin_developments');
var adminRecruitment = require('./backgroundRoutes/admin_recruitments');
var adminContactus = require('./backgroundRoutes/admin_contactus');
var userinfo = require('./backgroundRoutes/admin_userInfo');

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
/////////////////////////////后台页面开始///////////////////////////////////////////////
    //后台登陆页面
    app.get('/admin/login',userinfo.loginHTML);
    //退出
    app.get('/admin/logout',userinfo.logout);
    //登陆功能
    app.post('/adminLoginAjax',userinfo.adminLogin);
    //添加用户
    app.post('/admin/addAdminAjax',userinfo.addAdmin);
    //首页
    app.get('/admin',amdin.index);
    //添加产品
    app.post('/admin/adminAddProductAjax',adminProduct.adminAddProductAjax);
    //删除产品
    app.post('/admin/delProductAjax',adminProduct.delProductAjax);
    //根据id查询产品
    app.post('/admin/findProductById',adminProduct.findProductById)
    //更新产品
    app.post('/admin/updateProductAjax',adminProduct.updateProductAjax);
    //查询所有的产品
    app.get('/admin/adminAllProductAjax',adminProduct.adminAllProductAjax);
    //添加公司简介
    app.post('/admin/adminAddCompanyprofileAjax',adminCompanyprofile.adminAddCompanyprofileAjax);
    //删除公司简介
    app.post('/admin/delCompanyprofileAjax',adminCompanyprofile.delCompanyprofileAjax);
    //根据id查询公司简介
    app.post('/admin/findCompanyprofileById',adminCompanyprofile.findCompanyprofileById)
    //更新公司简介
    app.post('/admin/updateCompanyprofileAjax',adminCompanyprofile.updateCompanyprofileAjax);
    //查询全部公司简介
    app.get('/admin/adminAllCompanyprofile',adminCompanyprofile.adminAllCompanyprofile);
    //添加企业文化
    app.post('/admin/adminAddEnterprisecultureAjax',adminEnterpriseculture.adminAddEnterprisecultureAjax);
    //删除企业文化
    app.post('/admin/delEnterprisecultureAjax',adminEnterpriseculture.delEnterprisecultureAjax);
    //根据id查询企业文化
    app.post('/admin/findEnterprisecultureById',adminEnterpriseculture.findEnterprisecultureById)
    //更新企业文化
    app.post('/admin/updateEnterprisecultureAjax',adminEnterpriseculture.updatEenterprisecultureAjax);
    //查询全部企业文化
    app.get('/admin/adminAllEnterpriseculture',adminEnterpriseculture.adminAllEnterpriseculture);
    //添加发展历程
    app.post('/admin/adminAddDevelopmentAjax',adminDevelopment.adminAddDevelopmentAjax);
    //删除发展历程
    app.post('/admin/delDevelopmentAjax',adminDevelopment.delDevelopmentAjax);
    //根据id查询发展历程
    app.post('/admin/findDevelopmentById',adminDevelopment.findDevelopmentById)
    //更新发展历程
    app.post('/updateDevelopmentAjax',adminDevelopment.updateDevelopmentAjax);
    //查询全部发展历程
    app.get('/admin/adminAllDevelopment',adminDevelopment.adminAllDevelopment);
    //添加招贤纳士
    app.post('/admin/adminAddRecruitmentAjax',adminRecruitment.adminAddRecruitmentAjax);
    //删除招贤纳士
    app.post('/admin/delRecruitmentAjax',adminRecruitment.delRecruitmentAjax);
    //根据id查询招贤纳士
    app.post('/admin/findRecruitmentById',adminRecruitment.findRecruitmentById)
    //更新招贤纳士
    app.post('/admin/updateRecruitmentAjax',adminRecruitment.updateRecruitmentAjax);
    //查询全部招贤纳士
    app.get('/admin/adminAllRecruitment',adminRecruitment.adminAllRecruitment);
    //添加联系我们
    app.get('/admin/adminAddContactusAjax',adminContactus.adminAddContactusAjax);
    //删除联系我们
    app.post('/admin/delContactusAjax',adminContactus.delContactusAjax);
    //根据id查询联系我们
    app.post('/admin/findContactUsById',adminContactus.findContactusById);
    //更新联系我们
    app.put('/admin/updateContactUsAjax',adminContactus.updateContactusAjax);
    //查询全部联系我们
    app.get('/admin/adminAllContactUs',adminContactus.adminAllContactus);


};