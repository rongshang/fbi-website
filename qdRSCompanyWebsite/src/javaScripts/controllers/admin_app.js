/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

//后台页面
var app = angular.module('admin');
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
         //查询全部产品
        .when('/adminAllProduct/:pageNo', {templateUrl:'/views/admin_allProduct.html',controller: 'adminAllProductCtrl'})
         //添加产品
        .when('/adminAddProduct', {templateUrl:'/views/admin_addProduct.html',controller: 'adminAddProductCtrl'})
         //根据id查询产品
        .when('/findProductById/:id', {templateUrl:'/views/admin_updateProduct.html',controller: 'adminfindProductByIdCtrl'})
         //查询全部公司简介
        .when('/adminAllCompanyprofile/:pageNo', {templateUrl:'/views/admin_allCompanyprofiles.html',controller: 'adminAllCompanyprofileCtrl'})
        //添加公司简介
        .when('/adminAddCompanyprofile', {templateUrl:'/views/admin_addCompanyfiles.html',controller: 'adminAddCompanyprofileCtrl'})
         //根据id查询公司简介
        .when('/findenterprisecultureById/:id', {templateUrl:'/views/admin_updateCompanyprofile.html',controller: 'adminCompanyprofileByIdCtrl'})
        //查询全部企业文化
        .when('/adminAllEnterpriseculture/:pageNo', {templateUrl:'/views/admin_allEnterprisecultures.html',controller: 'adminAllEnterprisecultureCtrl'})
        //添加企业文化
        .when('/adminAddEnterpriseculture', {templateUrl:'/views/admin_addEnterpriseculture.html',controller: 'adminAddEnterprisecultureCtrl'})
        //根据id查询企业文化
        .when('/findEnterprisecultureById/:id', {templateUrl:'/views/admin_updateEnterprisecultures.html',controller: 'adminEnterprisecultureByIdCtrl'})

}
]);
