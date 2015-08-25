/**
 * Created by Administrator on 2015/7/7.
 */
/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var async = require('async');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
//图片处理
var ImageFileProvider = require('../../src/javaScripts/nodejs/common/ImageFileProvider.js').ImageFileProvider;
//联系我们
var contactus = require("../../src/javaScripts/nodejs/models/index").contactus;
var contactusDao = require("../../src/javaScripts/nodejs/dao/contactusDao");
var newContactusDao = new contactusDao(contactus);
var contactusDaoBse = new daoBase(contactus);

//查询全部联系我们
exports.adminAllContactus = function(req,res,next){
    var pageCount=0;
    var pageNo = parseInt(req.query.pageNo);
    var pageSize = 8;
    async.auto({
        getCount:function(callback){
            contactusDaoBse.countByQuery({},function(err,count){
                pageCount = parseInt(Math.ceil(count/pageSize));
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                callback(null,{"pageNo":pageNo,"pageCount":pageCount});
            });
        },
        getContactUs:function(callback){
            contactusDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,contactus){
                callback(null,contactus);
            });
        },
        getContactUsCodeImg:["getContactUs",function(callback,result){
            var count= 0;
            result.getContactUs.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.codeImg,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.codeImg = data;
                    if (count === result.getContactUs.length) {
                        callback(null, result.getContactUs);
                    }
                });
            })
        }],
        getContactUsLogo:["getContactUsCodeImg",function(callback,result){
            var count= 0;
            result.getContactUs.forEach(function(item,i){
                var fileProvider = new ImageFileProvider();
                fileProvider.read(item.logo,function(data){
                    count += 1;  //读完一个文件之后计数器自增
                    item.logo = data;
                    if (count === result.getContactUsCodeImg.length) {
                        callback(null, result.getContactUsCodeImg);
                    }
                });
            })
        }]
    },function(err,results){
        res.json({'title':'联系我们','pageNo':results.getCount.pageNo,'pageCount':results.getCount.pageCount,'contactus':results.getContactUsLogo});
    });
}

//更新联系我们
exports.updateContactusAjax = function(req,res,next){
    var contactus=req.body.contactus;
    async.auto({
        getCodeImgId:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(contactus.codeImg,function(fileId){
                callback(null,fileId);
            });
        },
        getLogoImgId:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(contactus.logo,function(fileId){
                callback(null,fileId);
            });
        },
        setImgIdAndUpdateData:["getCodeImgId","getLogoImgId",function(callback,result){
            var condition = {_id:contactus._id},
                update = {$set: {address:contactus.address
                    ,email:contactus.email
                    ,code:contactus.code
                    ,qq:contactus.qq
                    ,fax:contactus.fax
                    ,tel:contactus.tel
                    ,logo:result.getCodeImgId
                    ,codeImg:result.getCodeImgId
                }},
                options = {multi: true};
            contactusDaoBse.update(condition,update,options,function(data){
                if(data==null){
                    data={"msg":"1"}
                }else{
                    data={"msg":"0"}
                }
                callback(null,data);
            })
        }]
    },function(err,results){
        res.json(results.setImgIdAndUpdateData);
    });

    //var condition = {_id:contactus._id},
    //    update = {$set: {address:contactus.address
    //                    ,email:contactus.email
    //                    ,code:contactus.code
    //                    ,qq:contactus.qq
    //                    ,fax:contactus.fax
    //                    ,tel:contactus.tel
    //                    ,logo:contactus.logo
    //                    ,codeImg:contactus.codeImg}},
    //    options = {multi: true};
    //contactusDaoBse.update(condition,update,options,function(data){
    //    if(data==null){
    //        data={"msg":"1"}
    //    }else{
    //        data={"msg":"0"}
    //    }
    //    res.json(data);
    //})
}

//根据id查询联系我们
exports.findContactusById = function(req,res,next){
    var id=req.body.id;
    async.auto({
        getContactUs:function(callback){
            contactusDaoBse.getById(id,function(err,contactus){
                callback(null,contactus);
            })
        },
        getCodeImg:["getContactUs",function(callback,result){
            var fileProvider = new ImageFileProvider();
            fileProvider.read(result.getContactUs.codeImg,function(data){
                result.getContactUs.codeImg=data;
                callback(null,result.getContactUs);
            });
        }],
        getLogoImg:["getCodeImg",function(callback,result){
            var fileProvider = new ImageFileProvider();
            fileProvider.read(result.getCodeImg.logo,function(data){
                result.getCodeImg.logo=data;
                callback(null,result.getCodeImg);
            });
        }]
    },function(err,results){
        res.json(results.getLogoImg);
    });
}

//删除联系我们
exports.delContactusAjax = function(req,res,next){
    var id=req.body.id;
    contactusDaoBse.delete({_id:id},function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//添加联系我们
exports.adminAddContactusAjax = function(req,res,next){
    var contactus =req.body.contactus;
    contactus._id = uuid.v1();
    async.auto({
        addCodeImg:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(contactus.codeImg,function(fileId){
                callback(null,fileId);
            });
        },
        addLogo:function(callback){
            var fileProvider = new ImageFileProvider();
            fileProvider.insert(contactus.logo,function(fileId){
                callback(null,fileId);
            });
        },
        addData:["addCodeImg","addLogo",function(callback,result){
            contactus.codeImg = result.addCodeImg;
            contactus.logo = result.addLogo;
            newContactusDao.save(contactus,function(data){
               callback(null,data);
            });
        }]
    },function(err,results){
        res.json(results.addData);
    });
}