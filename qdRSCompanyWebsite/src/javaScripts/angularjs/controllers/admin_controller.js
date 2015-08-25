/**
 * Created by Administrator on 2015/5/18.
 */

'use strict'

var app = angular.module('admin',['ngRoute','angularFileUpload','ngSanitize','appFilereader']);

//用户注册
app.controller('addAdminCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
     $scope.userinfo={_id:'',username:'',password:'',level:'',createdTime:getCreateTime()};
     $scope.repassword="";
    $scope.save = function(){
        var regExpUname = /^[\w\u4e00-\u9f5a]{4,20}$/;
        var regExpPwd = /^(\w+){6,20}$/;
        if(!regExpUname.test($scope.userinfo.username)){
            alert("用户名格式为数字、字母、下划线和中文4到20位");
            return;
        }

        if(!regExpPwd.test($scope.userinfo.password)){
            alert("密码格式为数字、字母、下划线6到20位");
            return;
        }

        if($scope.userinfo.password!=$scope.repassword){
            alert("两次密码不一致");
            return;
        }
        $http({
            method:'POST',
            url:'/admin/addAdminAjax',
            params: {userinfo:$scope.userinfo}
        }).success(function(data, status, headers, config){
            if(data.msg=='0'){
                alert("用户名已存在");
            }else if(data.msg=='1'){
                alert("添加用户成功");
            }else if(data.msg=='2'){
                alert("添加失败");
            }
        });
    }

}])


//所有的产品展示
app.controller('adminAllProductCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询产品
    var pageNo = $routeParams.pageNo;
    $scope.title="";
    $scope.find = function(){
        $http({
            method:'get',
            url:'/admin/adminAllProductAjax',
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
            $http.post('/admin/delProductAjax',{id:id}).success(function(data) {
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
            dataType:'json',
            url:'/admin/adminAddProductAjax',
            data:{product:$scope.product}
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
    $http.post('/admin/findProductById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新产品
    $scope.save = function(product){
        product.concat=editor.html()
        $http.post('/admin/updateProductAjax',{product:product}).success(function(data) {
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
            url:'/admin/adminAllCompanyprofile',
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
            $http.post('/admin/delCompanyprofileAjax',{id:id}).success(function(data) {
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
    $http.post('/admin/findCompanyprofileById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新公司简介
    $scope.save = function(companyprofile){
        companyprofile.concat=editor.html()
        $http.post('/admin/updateCompanyprofileAjax',{companyprofile:companyprofile}).success(function(data) {
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
            url:'/admin/adminAddCompanyprofileAjax',
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
        url:'/admin/adminAllEnterpriseculture',
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
            $http.post('/admin/delEnterprisecultureAjax',{id:id}).success(function(data) {
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
    $http.post('/admin/findEnterprisecultureById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新企业文化
    $scope.save = function(enterpriseculture){
        enterpriseculture.concat=editor.html()
        $http.post('/admin/updateEnterprisecultureAjax',{enterpriseculture:enterpriseculture}).success(function(data) {
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
            url:'/admin/adminAddEnterprisecultureAjax',
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
        url:'/admin/adminAllDevelopment',
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
            $http.post('/admin/delDevelopmentAjax',{id:id}).success(function(data) {
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
    $http.post('/admin/findDevelopmentById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新发展历程
    $scope.save = function(development){
        development.concat=editor.html()
        $http.post('/admin/updateDevelopmentAjax',{development:development}).success(function(data) {
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
            url:'/admin/adminAddDevelopmentAjax',
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
        url:'/admin/adminAllRecruitment',
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
            $http.post('/admin/delRecruitmentAjax',{id:id}).success(function(data) {
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
    $http.post('/admin/findRecruitmentById',{id:$routeParams.id}).success(function(data) {
        editor.html(data.concat);
        $scope.datas = data;
    });

    //更新招贤纳士
    $scope.save = function(recruitment){
        recruitment.concat=editor.html()
        $http.post('/admin/updateRecruitmentAjax',{recruitment:recruitment}).success(function(data) {
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
            url:'/admin/adminAddRecruitmentAjax',
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

//联系我们
//查询全部联系我们
app.controller('adminAllContactUsCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询联系我们
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/admin/adminAllContactUs',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询联系我们
    $scope.update = function(id){
        $location.path("/findContactusById/"+id);
    }

    //删除联系我们
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.post('/admin/delContactusAjax',{'id':id}).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询联系我们
app.controller("adminContactUsByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/admin/findContactUsById',{'id':$routeParams.id}).success(function(data) {
        $scope.datas = data;
    });

    //更新联系我们
    $scope.save = function(contactus){
        $http.put('/admin/updateContactUsAjax',{"contactus":contactus}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增联系我们
app.controller('adminAddContactUsCtrl',['$scope','$http',function($scope,$http){
    $scope.contactus = {
        _id:''
        ,address:''
        ,email:''
        ,code:''
        ,qq:''
        ,fax:''
        ,tel:''
        ,logo:''
        ,codeImg:''
        ,createdTime:""
    };
    $scope.save = function(){
        $scope.contactus.createdTime=getCreateTime();
        $http.post("/admin/adminAddContactusAjax",{"contactus":$scope.contactus}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}]);

//资质荣誉
//查询全部资质荣誉
app.controller('adminAllHonorCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询资质荣誉
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/admin/adminAllHonor',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询资质荣誉
    $scope.update = function(id){
        $location.path("/findHonorById/"+id);
    }

    //删除资质荣誉
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.delete('/admin/delHonorAjax?id='+id).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询资质荣誉
app.controller("adminHonorByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){

    $http.post('/admin/findHonorById',{'id':$routeParams.id}).success(function(data) {
        $scope.datas = data;
    });

    //更新资质荣誉
    $scope.save = function(honor){
        $http.put('/admin/updateHonorAjax',{"honor":honor}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增资质荣誉
app.controller('adminAddHonorCtrl',['$scope','$http',function($scope,$http){
    $scope.honor = {
        _id:''
        ,image:''
        ,createdTime:""
    };
    $scope.save = function(){
        $scope.honor.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/admin/adminAddHonorAjax',
            data: {'honor':$scope.honor}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);

//风云人物
//查询全部风云人物
app.controller('adminAllFigureCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询风云人物
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/admin/adminAllFigure',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询风云人物
    $scope.update = function(id){
        $location.path("/findFigureById/"+id);
    }

    //删除风云人物
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.delete('/admin/delFigureAjax?id='+id).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询风云人物
app.controller("adminFigureByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/admin/findFigureById',{'id':$routeParams.id}).success(function(data) {
        $scope.datas = data;
        editor.html(data.honor);
    });
    //更新风云人物
    $scope.save = function(figure){
        figure.honor=editor.html()
        $http.put('/admin/updateFigureAjax',{figure:figure}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增风云人物
app.controller('adminAddFigureCtrl',['$scope','$http',function($scope,$http){
    $scope.figure = {
        _id:""
        ,image:""
        ,name:""
        ,job:""
        ,honor:""
        ,createdTime:""
    };
    $scope.save = function(){
        $scope.figure.honor=editor.html();
        $scope.figure.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/admin/adminAddFigureAjax',
            data: {'figure':$scope.figure}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);


//合作伙伴
//查询全部合作伙伴
app.controller('adminAllPartnerCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询合作伙伴
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/admin/adminAllPartner',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询合作伙伴
    $scope.update = function(id){
        $location.path("/findPartnerById/"+id);
    }

    //删除合作伙伴
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.delete('/admin/delPartnerAjax?id='+id).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询合作伙伴
app.controller("adminPartnerByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/admin/findPartnerById',{'id':$routeParams.id}).success(function(data) {
        $scope.datas = data;
        editor.html(data.concat);
    });
    //更新合作伙伴
    $scope.save = function(partner){
        partner.concat = editor.html();
        $http.put('/admin/updatePartnerAjax',{"partner":partner}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增合作伙伴
app.controller('adminAddPartnerCtrl',['$scope','$http',function($scope,$http){
    $scope.partner = {
        _id:""
        ,image:""
        ,concat:""
        ,title:""
        ,createdTime:""
    };
    $scope.save = function(){
        $scope.partner.concat=editor.html();
        $scope.partner.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/admin/adminAddPartnerAjax',
            data: {'partner':$scope.partner}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);


//新闻
//查询全部新闻
app.controller('adminAllNewsCtrl',['$scope','$http','$location','$routeParams','$rootScope',function($scope,$http,$location,$routeParams,$rootScope){
    //查询新闻
    var pageNo = $routeParams.pageNo;
    $http({
        method:'get',
        url:'/admin/adminAllNews',
        params: {pageNo:pageNo}
    }).success(function(data, status, headers, config){
        $scope.datas = data;
    });

    //根据id查询新闻
    $scope.update = function(id){
        $location.path("/findNewsById/"+id);
    }

    //删除新闻
    $scope.del = function(id){
        if(confirm("你确定删除吗？")){
            $http.delete('/admin/delNewsAjax?id='+id).success(function(data) {
                if(data.msg=='1'){
                    window.location.reload();
                }else{
                    alert("删除失败");
                }
            });
        }
    }
}])

//根据id查询新闻
app.controller("adminNewsByIdCtrl",['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
    $http.post('/admin/findNewsById',{'id':$routeParams.id}).success(function(data) {
        $scope.datas = data;
        editor.html(data.concat);
    });
    //更新新闻
    $scope.save = function(news){
        news.concat = editor.html();
        $http.put('/admin/updateNewsAjax',{"news":news}).success(function(data) {
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("更新失败");
            }
        });
    }
}])

//新增新闻
app.controller('adminAddNewsCtrl',['$scope','$http',function($scope,$http){
    $scope.news = {
        _id:""
        ,image:""
        ,concat:""
        ,title:""
        ,createdTime:""
    };
    $scope.save = function(){
        $scope.news.concat=editor.html();
        $scope.news.createdTime=getCreateTime();
        $http({
            method:'post',
            url:'/admin/adminAddNewsAjax',
            data: {'news':$scope.news}
        }).success(function(data, status, headers, config){
            if(data.msg=='1'){
                window.location.reload();
            }else{
                alert("添加失败");
            }
        });
    }
}]);