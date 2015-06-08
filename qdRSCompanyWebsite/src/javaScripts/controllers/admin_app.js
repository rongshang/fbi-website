/**
 * Created by Administrator on 2015/5/18.
 */


'use strict'

//后台页面
var app = angular.module('admin');
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/adminAllProduct/:pageNo', {templateUrl:'/views/admin_allProduct.html',controller: 'adminAllProductCtrl'})
        .when('/adminAddProduct', {templateUrl:'/views/admin_addProduct.html',controller: 'adminAddProductCtrl'})
        .when('/findById/:id', {templateUrl:'/views/admin_updateProduct.html',controller: 'adminfindByIdProductCtrl'})

}
]);
