/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

//后台页面
var app = angular.module('admin');
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
         //查询全部产品
        .when('/adminAllProduct/:pageNo', {templateUrl:'/views/backgroundModule/product/admin_allProduct.html',controller: 'adminAllProductCtrl'})
         //添加产品
        .when('/adminAddProduct', {templateUrl:'/views/backgroundModule/product/admin_addProduct.html',controller: 'adminAddProductCtrl'})
         //根据id查询产品
        .when('/findProductById/:id', {templateUrl:'/views/backgroundModule/product/admin_updateProduct.html',controller: 'adminfindProductByIdCtrl'})
         //查询全部公司简介
        .when('/adminAllCompanyprofile/:pageNo', {templateUrl:'/views/backgroundModule/companyfile/admin_allCompanyprofiles.html',controller: 'adminAllCompanyprofileCtrl'})
        //添加公司简介
        .when('/adminAddCompanyprofile', {templateUrl:'/views/backgroundModule/companyfile/admin_addCompanyfile.html',controller: 'adminAddCompanyprofileCtrl'})
         //根据id查询公司简介
        .when('/findCompanyprofileById/:id', {templateUrl:'/views/backgroundModule/companyfile/admin_updateCompanyprofile.html',controller: 'adminCompanyprofileByIdCtrl'})
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

}
]);
