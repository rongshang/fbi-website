/**
 * Created by Administrator on 2015/7/2.
 */
'use strict'

var app = angular.module('admin',[]);
//管理员登陆
app.controller('aa',['$scope','$http',function($scope,$http) {
    $scope.userinfo = {username:'1111',password:''};
    alert("");
    $scope.getUserInfoByUsernameAndPassword = function(){
        alert(userinfo.username);
    }

}]);
