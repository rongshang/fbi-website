/**
 * Created by Administrator on 2015/7/2.
 */
'use strict'
var app = angular.module('admin',[]);
//管理员登陆
app.controller('adminLoginController',['$scope','$http',function($scope,$http) {
    $scope.userinfo = {username:'',password:''};
    $scope.getUserInfoByUsernameAndPassword = function(){
            if($scope.userinfo.username==""){
                alert("用户名不能为空");
                return;
            }else if($scope.userinfo.password==""){
                alert("密码用户名不能为空");
                return;
            }

        $http({
            method:'post',
            url:'/adminLoginAjax',
            params: {userinfo:$scope.userinfo}
        }).success(function(data, status, headers, config){
            if(data.msg=='0'){
                alert("服务器错误");
            }else if(data.msg=='1'){
                alert("用户名或密码错误");
            }else if(data.msg=='2'){
                window.location.href='/admin/#/index';
            }
        });
    }

}]);
