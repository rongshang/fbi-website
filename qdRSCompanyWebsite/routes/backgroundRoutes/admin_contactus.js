/**
 * Created by Administrator on 2015/7/7.
 */
/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
var howdo = require('howdo');
var daoBase = require("../../src/javaScripts/nodejs/dao/DaoBase");
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
    howdo
        .task(function(done){
            contactusDaoBse.countByQuery({},function(err,count){
                pageCount = parseInt(Math.ceil(count/pageSize));
                if(pageNo>pageCount){
                    pageNo = pageCount;
                }else if(pageNo<0){
                    pageNo = 1;
                }
                done(null,pageNo,pageCount);
            });
        })
        .task(function(done){
            contactusDaoBse.findAllByPageAndQuery({},{createdTime:-1},pageNo,pageSize,function(err,contactus){
                done(null,contactus);
            });
        })
        .together(function(err,pageNo,pageCount,contactus){
            res.json({'title':'联系我们','pageNo':pageNo,'pageCount':pageCount,'contactus':contactus});
        });
}

//更新联系我们
exports.updateContactusAjax = function(req,res,next){
    var contactus=req.body.contactus;
    var condition = {_id:contactus._id},
        update = {$set: {address:contactus.address
                        ,email:contactus.email
                        ,code:contactus.code
                        ,qq:contactus.qq
                        ,fax:contactus.fax
                        ,tel:contactus.tel
                        ,logo:contactus.logo
                        ,codeImg:contactus.codeImg}},
        options = {multi: true};
    contactusDaoBse.update(condition,update,options,function(data){
        if(data==null){
            data={"msg":"1"}
        }else{
            data={"msg":"0"}
        }
        res.json(data);
    })
}

//根据id查询联系我们
exports.findContactusById = function(req,res,next){
    var id=req.body.id;
    contactusDaoBse.getById(id,function(err,contactus){
        res.json(contactus);
    })
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
    var contactus =JSON.parse(req.query.contactus);
    contactus._id = uuid.v1();
    newContactusDao.save(contactus,function(data){
        res.json(data);
    });
}