/**
 * Created by Administrator on 2015/4/16.
 */
'use strict'

var app = angular.module('app',['ngRoute']);
app.controller('welcomeCtrl',['$scope','$http',function($scope,$http){
        $http.get('/welcome').success(function(data) {
            $scope.datas= data;
        });
    }
]);

//新闻控制器
app.controller('allNewsCtrl',['$scope','$http','$location',function($scope,$http,$location){
    var pageNo = $location.search().pageNo;
        $http({
            method:'GET',
            url:'/allnewsAjax',
            params: {pageNo:pageNo}
        }).success(function(data, status, headers, config){
            $scope.datas = data;
        });
    }
]);

//新闻详细内容控制器
app.controller('newsdetailCtrl',['$scope','$http','$location',function($scope,$http,$location){
            var id = $location.search().id;
            $http({
                method:'GET',
                url:'/newsdetailAjax',
                params: {newsid:id}
            }).success(function(data, status, headers, config){
                $scope.news = data;
            });
    }
]);

//合作伙伴控制器
app.controller('allpartnerCtrl',['$scope','$http','$location',function($scope,$http,$location){
    var id = $location.search().id;
    $http({
        method:'GET',
        url:'/allPartnersAjax',
        params: {productid:id}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });
}
]);

//产品详细内容控制器
app.controller('productdetailCtrl',['$scope','$http','$location',function($scope,$http,$location){
    var id = $location.search().id;
    $http({
        method:'GET',
        url:'/productdetailAjax',
        params: {productid:id}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });
}
]);