/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

var app = angular.module('admin',['ngRoute','angularFileUpload','ngSanitize']);
//所有的产品展示
app.controller('adminAllProductCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){

    //查询产品
    var pageNo = $routeParams.pageNo;
    $scope.find = function(){
        alert("");
        $http({
            method:'get',
            url:'/adminAllProductAjax',
            params: {pageNo:pageNo,title:'1111'}
        }).success(function(data, status, headers, config){
            alert(JSON.stringify(data));
            $scope.$apply.datas = data;
        });
    }
    $scope.find();

    //根据id查询产品
    $scope.update = function(id){
        $location.path("/findById/"+id);
    }

    //删除产品
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.post('/delProductAjax',{id:id}).success(function(data) {
                $scope.datas = data;
            });
        }
    }

}])

//新增产品
app.controller('adminAddProductCtrl',['$scope','$http',function($scope,$http){
    $scope.product = {
        _id:'',
        createdTime:'',
        image:'',
        title:'',
        videosrc:'',
        websiteUrl:'',
        concat:''
    };
    /*
    var day = new Date();
    var month = day.getMonth()+1;
    var createdTime = day.getFullYear() + '-' +month+'-'+day.getDate()+' '+day.getHours()+':'+day.getMinutes()+':'+day.getSeconds();
    $scope.product.createdTime=createdTime

    /////////////////////////////////////////////////////////////////////
    var uploader=$scope.uploader = new FileUploader({
        scope: $scope,
        url:window.location.protocol + '//' + window.location.host + '/adminProductAjax',
        formData:[{"product":$scope.product}]
    });

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
            if (fileSize <= 1)
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
            if (this.queue.length <=1)
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
    */
///////////////////////////////////////////////////////////////////////////
    $scope.save = function(){
        $scope.product.concat=editor.html();

        $scope.product.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/adminAddProductAjax',
            params: {'product':$scope.product}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
  }
]);

//根据id查询产品
app.controller("adminfindByIdProductCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/findById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新产品
    $scope.save = function(product){
        product.concat=editor.html()
        $http.post('/updateProductAjax',{product:product}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }

}

])



