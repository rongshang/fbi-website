/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
//产品模块
var products = require("../src/javaScripts/models").products;
var productsDao = require("../src/javaScripts/dao/productsDao");

exports.adminProductAjax = function(req,res){
    console.log("======"+uuid.v1);
    //productsDao.insert();
}
