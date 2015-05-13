/**
 * Created by huzy on 2015/4/16.
 */
'use strict'

var app = angular.module('app');
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/welcome', {templateUrl:'views/welcome.html',controller: 'welcomeCtrl'})
        .when('/allnews', {templateUrl:'views/allnews.html',controller: 'allNewsCtrl'})
        .when('/newsdetail', {templateUrl:'views/newsdetail.html',controller: 'newsdetailCtrl'})
        .when('/productdetail', {templateUrl:'views/productdetail.html',controller: 'productdetailCtrl'})
        .when('/allpartner', {templateUrl:'views/allpartner.html',controller: 'allpartnerCtrl'})
        .when('/allrecruitment', {templateUrl:'views/allrecruitment.html',controller: 'allrecruitmentCtrl'})
        .when('/recruitmentdetail', {templateUrl:'views/recruitmentdetail.html',controller: 'recruitmentdetailCtrl'})
        .when('/allproduct', {templateUrl:'views/allproduct.html',controller: 'allproductCtrl'});
}
]);