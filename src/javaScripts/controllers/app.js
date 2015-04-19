/**
 * Created by huzy on 2015/4/16.
 */
'use strict'

var app = angular.module('app');
app.config(['$routeProvider',function($routeProvider){
    $routeProvider.when(
        '/',
        {
            templateUrl:'views/welcome.html',
            controller: 'welcomeCtrl'
        }
    );
}
]);