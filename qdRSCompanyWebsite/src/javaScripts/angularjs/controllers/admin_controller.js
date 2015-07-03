/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

var app = angular.module('admin',['ngRoute','angularFileUpload','ngSanitize','appFilereader']);
//管理员登陆
app.controller('adminLoginCtrl',['$scope','$http',function($scope,$http) {
   $scope.userinfo = {username:'1111',password:''};
    alert("");
    $scope.getUserInfoByUsernameAndPassword = function(){
        alert(userinfo.username);
    }

}]);

//所有的产品展示
app.controller('adminAllProductCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询产品
    var pageNo = $routeParams.pageNo;
    $scope.title="";
    $scope.find = function(){
        $http({
            method:'get',
            url:'/adminAllProductAjax',
            params: {pageNo:pageNo,title:$scope.title}
        }).success(function(data, status, headers, config){
            $scope.datas = data;
        });
    }
    $scope.find();

    //根据id查询产品
    $scope.update = function(id){
        $location.path("/findProductById/"+id);
    }

    //删除产品
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.post('/delProductAjax',{id:id}).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
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
}]);

//根据id查询产品
app.controller("adminfindProductByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/findProductById',{id:$routeParams.id}).success(function(data) {
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
}])

//查询全部公司简介
app.controller('adminAllCompanyprofileCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询公司简介
    var pageNo = $routeParams.pageNo;
        $http({
            method:'get',
            url:'/adminAllCompanyprofile',
            params: {pageNo:pageNo}
        }).success(function(data, status, headers, config){
            $scope.datas = data;
        });

    //根据id查询公司简介
    $scope.update = function(id){
        $location.path("/findCompanyprofileById/"+id);
    }

    //删除公司简介
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.post('/delCompanyprofileAjax',{id:id}).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询公司简介
app.controller("adminCompanyprofileByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/findCompanyprofileById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新公司简介
    $scope.save = function(companyprofile){
        companyprofile.concat=editor.html()
        $http.post('/updateCompanyprofileAjax',{companyprofile:companyprofile}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增公司简介
app.controller('adminAddCompanyprofileCtrl',['$scope','$http',function($scope,$http){
    $scope.companyprofile = {_id:'', concat:''};
    $scope.save = function(){
        $scope.companyprofile.concat=editor.html();
        $scope.companyprofile.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/adminAddCompanyprofileAjax',
            params: {'companyprofile':$scope.companyprofile}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);

//企业文化
//查询全部企业文化
app.controller('adminAllEnterprisecultureCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询企业文化
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/adminAllEnterpriseculture',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询企业文化
    $scope.update = function(id){
        $location.path("/findEnterprisecultureById/"+id);
    }

    //删除企业文化
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.post('/delEnterprisecultureAjax',{id:id}).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询企业文化
app.controller("adminEnterprisecultureByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/findEnterprisecultureById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新企业文化
    $scope.save = function(enterpriseculture){
        enterpriseculture.concat=editor.html()
        $http.post('/updateEnterprisecultureAjax',{enterpriseculture:enterpriseculture}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增企业文化
app.controller('adminAddEnterprisecultureCtrl',['$scope','$http',function($scope,$http){
    $scope.enterpriseculture = {_id:'', concat:''};
    $scope.save = function(){
        $scope.enterpriseculture.concat=editor.html();
        $scope.enterpriseculture.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/adminAddEnterprisecultureAjax',
            params: {'enterpriseculture':$scope.enterpriseculture}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);

//发展历程
//查询全部发展历程
app.controller('adminAllDevelopmentCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询发展历程
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/adminAllDevelopment',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询发展历程
    $scope.update = function(id){
        $location.path("/findDevelopmentById/"+id);
    }

    //删除发展历程
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.post('/delDevelopmentAjax',{id:id}).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询发展历程
app.controller("adminDevelopmentByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/findDevelopmentById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新发展历程
    $scope.save = function(development){
        development.concat=editor.html()
        $http.post('/updateDevelopmentAjax',{development:development}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增发展历程
app.controller('adminAddDevelopmentCtrl',['$scope','$http',function($scope,$http){
    $scope.development = {_id:'', concat:''};
    $scope.save = function(){
        $scope.development.concat=editor.html();
        $scope.development.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/adminAddDevelopmentAjax',
            params: {'development':$scope.development}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);

//招贤纳士
//查询全部招贤纳士
app.controller('adminAllRecruitmentCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询招贤纳士
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/adminAllRecruitment',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询招贤纳士
    $scope.update = function(id){
        $location.path("/findRecruitmentById/"+id);
    }

    //删除招贤纳士
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.post('/delRecruitmentAjax',{id:id}).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询招贤纳士
app.controller("adminRecruitmentByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/findRecruitmentById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新招贤纳士
    $scope.save = function(recruitment){
        recruitment.concat=editor.html()
        $http.post('/updateRecruitmentAjax',{recruitment:recruitment}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增招贤纳士
app.controller('adminAddRecruitmentCtrl',['$scope','$http',function($scope,$http){
    $scope.recruitment = {
        _id:''
        ,job:""
        ,count:""
        ,address:""
        ,salary:""
        ,concat:""
        ,tel:""
        ,email:""
        ,treatment:""
        ,createdTime:""
    };
    $scope.save = function(){
        $scope.recruitment.concat=editor.html();
        $scope.recruitment.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/adminAddRecruitmentAjax',
            params: {'recruitment':$scope.recruitment}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);