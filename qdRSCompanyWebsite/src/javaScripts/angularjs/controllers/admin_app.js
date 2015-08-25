/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

//后台页面
var app = angular.module('admin');
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        //添加新用户
        .when('/addAdmin', {templateUrl:'/views/backgroundModule/userinfo/admin_register.html',controller: 'addAdminCtrl'})
        //查询全部产品
        .when('/adminAllProduct/:pageNo', {templateUrl:'/views/backgroundModule/product/admin_allProduct.html',controller: 'adminAllProductCtrl'})
         //添加产品
        .when('/adminAddProduct', {templateUrl:'/views/backgroundModule/product/admin_addProduct.html',controller: 'adminAddProductCtrl'})
         //根据id查询产品
        .when('/findProductById/:id', {templateUrl:'/views/backgroundModule/product/admin_updateProduct.html',controller: 'adminfindProductByIdCtrl'})
         //查询全部公司简介
        .when('/adminAllCompanyprofile/:pageNo', {templateUrl:'/views/backgroundModule/companyprofile/admin_allCompanyprofiles.html',controller: 'adminAllCompanyprofileCtrl'})
        //添加公司简介
        .when('/adminAddCompanyprofile', {templateUrl:'/views/backgroundModule/companyprofile/admin_addCompanyprofile.html',controller: 'adminAddCompanyprofileCtrl'})
         //根据id查询公司简介
        .when('/findCompanyprofileById/:id', {templateUrl:'/views/backgroundModule/companyprofile/admin_updateCompanyprofile.html',controller: 'adminCompanyprofileByIdCtrl'})
        //查询全部企业文化
        .when('/adminAllEnterpriseculture/:pageNo', {templateUrl:'/views/backgroundModule/enterpriseculture/admin_allEnterprisecultures.html',controller: 'adminAllEnterprisecultureCtrl'})
        //添加企业文化
        .when('/adminAddEnterpriseculture', {templateUrl:'/views/backgroundModule/enterpriseculture/admin_addEnterpriseculture.html',controller: 'adminAddEnterprisecultureCtrl'})
        //根据id查询企业文化
        .when('/findEnterprisecultureById/:id', {templateUrl:'/views/backgroundModule/enterpriseculture/admin_updateEnterpriseculture.html',controller: 'adminEnterprisecultureByIdCtrl'})
        //查询全部发展历程
        .when('/adminAllDevelopment/:pageNo', {templateUrl:'/views/backgroundModule/development/admin_allDevelopments.html',controller: 'adminAllDevelopmentCtrl'})
        //添加发展历程
        .when('/adminAddDevelopment', {templateUrl:'/views/backgroundModule/development/admin_addDevelopment.html',controller: 'adminAddDevelopmentCtrl'})
        //根据id查询发展历程
        .when('/findDevelopmentById/:id', {templateUrl:'/views/backgroundModule/development/admin_updateDevelopment.html',controller: 'adminDevelopmentByIdCtrl'})
        //查询全部招贤纳士
        .when('/adminAllRecruitment/:pageNo', {templateUrl:'/views/backgroundModule/recruitment/admin_allRecruitments.html',controller: 'adminAllRecruitmentCtrl'})
        //添加招贤纳士
        .when('/adminAddRecruitment', {templateUrl:'/views/backgroundModule/recruitment/admin_addRecruitment.html',controller: 'adminAddRecruitmentCtrl'})
        //根据id查询招贤纳士
        .when('/findRecruitmentById/:id', {templateUrl:'/views/backgroundModule/recruitment/admin_updateRecruitment.html',controller: 'adminRecruitmentByIdCtrl'})
        //查询全部联系我们
        .when('/adminAllContactus/:pageNo', {templateUrl:'/views/backgroundModule/contactus/admin_allContactUs.html',controller: 'adminAllContactUsCtrl'})
        //添加联系我们
        .when('/adminAddContactus', {templateUrl:'/views/backgroundModule/contactus/admin_addContactUs.html',controller: 'adminAddContactUsCtrl'})
        //根据id查询联系我们
        .when('/findContactusById/:id', {templateUrl:'/views/backgroundModule/contactus/admin_updateContactUs.html',controller: 'adminContactUsByIdCtrl'})
        //查询全部资质荣誉
        .when('/adminAllHonor/:pageNo', {templateUrl:'/views/backgroundModule/honor/admin_allHonor.html',controller: 'adminAllHonorCtrl'})
        //添加资质荣誉
        .when('/adminAddHonor', {templateUrl:'/views/backgroundModule/honor/admin_addHonor.html',controller: 'adminAddHonorCtrl'})
        //根据id查询资质荣誉
        .when('/findHonorById/:id', {templateUrl:'/views/backgroundModule/honor/admin_updateHonor.html',controller: 'adminHonorByIdCtrl'})
        //查询全部风云人物
        .when('/adminAllFigure/:pageNo', {templateUrl:'/views/backgroundModule/figure/admin_allFigure.html',controller: 'adminAllFigureCtrl'})
        //添加风云人物
        .when('/adminAddFigure', {templateUrl:'/views/backgroundModule/figure/admin_addFigure.html',controller: 'adminAddFigureCtrl'})
        //根据id查询风云人物
        .when('/findFigureById/:id', {templateUrl:'/views/backgroundModule/figure/admin_updateFigure.html',controller: 'adminFigureByIdCtrl'})
        //查询全部合作伙伴
        .when('/adminAllPartner/:pageNo', {templateUrl:'/views/backgroundModule/partner/admin_allPartner.html',controller: 'adminAllPartnerCtrl'})
        //添加合作伙伴
        .when('/adminAddPartner', {templateUrl:'/views/backgroundModule/partner/admin_addPartner.html',controller: 'adminAddPartnerCtrl'})
        //根据id查询合作伙伴
        .when('/findPartnerById/:id', {templateUrl:'/views/backgroundModule/partner/admin_updatePartner.html',controller: 'adminPartnerByIdCtrl'})
        //查询全部新闻
        .when('/adminAllNews/:pageNo', {templateUrl:'/views/backgroundModule/news/admin_allNews.html',controller: 'adminAllNewsCtrl'})
        //添加新闻
        .when('/adminAddNews', {templateUrl:'/views/backgroundModule/news/admin_addNews.html',controller: 'adminAddNewsCtrl'})
        //根据id查询新闻
        .when('/findNewsById/:id', {templateUrl:'/views/backgroundModule/news/admin_updateNews.html',controller: 'adminNewsByIdCtrl'})

}
]);
