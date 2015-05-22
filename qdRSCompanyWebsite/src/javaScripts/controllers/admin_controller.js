/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

var app = angular.module('admin',['ngRoute','angularFileUpload']);
app.controller('adminProductCtrl',['$scope','$http','FileUploader',function($scope,$http,FileUploader){
    $scope.product = {
        _id:'',
        createdTime:'',
        image:'',
        title:'',
        videosrc:'',
        websiteUrl:'',
        concat:''
    };

    var uploader=$scope.uploader = new FileUploader({
        url:window.location.protocol + '//' + window.location.host +
        window.location.pathname + 'upload/temp'
    });
      alert(window.location.protocol + '//' + window.location.host +window.location.pathname + 'upload/temp');
    // FILTERS
    uploader.filters.push({
        name: 'extensionFilter',
        fn: function (item, options) {
            var filename = item.name;
            var extension = filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
            if (extension == "gif" ||extension == "jpg" ||extension == "png")
                return true;
            else {
                alert('请选择图片格式为: gif/jpg/png');
                return false;
            }
        }
    });

    uploader.filters.push({
        name: 'sizeFilter',
        fn: function (item, options) {
            var fileSize = item.size;
            fileSize = parseInt(fileSize) / (1024 * 1024);
            if (fileSize <= 5)
                return true;
            else {
                alert('Selected file exceeds the 5MB file size limit.Please choose a new file and try again.');
                return false;
            }
        }
    });

    uploader.filters.push({
        name: 'itemResetFilter',
        fn: function (item, options) {
            if (this.queue.length < 5)
                return true;
            else {
                alert('You have exceeded the limit of uploading files.');
                return false;
            }
        }
    });

    // CALLBACKS
    uploader.onWhenAddingFileFailed = function (item, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function (fileItem) {
        alert('Files ready for upload.');
    };

    uploader.onSuccessItem = function (fileItem, response, status, headers) {
        $scope.uploader.queue = [];
        $scope.uploader.progress = 0;
        alert('Selected file has been uploaded successfully.');
    };
    uploader.onErrorItem = function (fileItem, response, status, headers) {
        alert('We were unable to upload your file. Please try again.');
    };
    uploader.onCancelItem = function (fileItem, response, status, headers) {
        alert('File uploading has been cancelled.');
    };

    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);

    $scope.save = function(){
        var day = new Date();
        var month = day.getMonth()+1;
        var createdTime = day.getFullYear() + '-' +month+'-'+day.getDate()+' '+day.getHours()+':'+day.getMinutes()+':'+day.getSeconds();
        $scope.product.createdTime=createdTime
        $http({
            method:'get',
            url:'/adminProductAjax',
            params: {'product':$scope.product}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                alert("添加成功");
            }else{
                alert("添加失败");
            }
        });

    }
  }
]);


