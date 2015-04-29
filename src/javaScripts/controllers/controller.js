/**
 * Created by Administrator on 2015/4/16.
 */
'use strict'

var app = angular.module('app',['ngRoute']);
app.controller('welcomeCtrl',['$scope','$http',function($scope,$http){
        $http.get('/welcome').success(function(data) {
            console.log("====data====="+data);
            $scope.images= data;
        });
        $http.get('/news').success(function(data) {
            console.log("====data====="+data);
            $scope.news= data;
        });
  }

]);
