/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

var app = angular.module('admin',['ngRoute','directives']);
app.controller('adminProductCtrl',['$scope','$http',function($scope,$http){
    $scope.product = {
        _id:'20150518',
        createdTime:'',
        image:'',
        title:'',
        videosrc:'',
        websiteUrl:'',
        concat:''
    };
    $scope.uploadFinished = function(e, data) {
        alert(data);
        console.log('We just finished uploading this baby...');
    };

    $scope.uploading = function(e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        console.log(progress + '%');
    };

    $scope.save = function(){
        alert("submit");
        $http({
            method:'post',
            url:'/adminProductAjax',
            params: {'product':'1231312'}
        }).success(function(data, status, headers, config){
            $scope.datas = data;
        });
    }

  }
]);


