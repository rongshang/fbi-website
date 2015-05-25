/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//联系我们
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactusSchema = new Schema({
    _id:String,
    qq:String,
    tel:String,
    codeImg:String,//二维码
    address:String,
    email:String,
    logo:String,
    code: String,
    fax:String,
    createdTime:String
});

mongoose.model('contactus',contactusSchema);
