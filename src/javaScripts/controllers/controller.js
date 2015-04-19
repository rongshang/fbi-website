/**
 * Created by Administrator on 2015/4/16.
 */
var app = angular.module('app',['ngRoute']);
app.controller('welcomeCtrl',['$scope',function($scope){

    $scope.username = 'hello world'
}

]);
