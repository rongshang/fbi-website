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
    code:String,//二维码
    address:String,
    location: Object,//坐标{x:'',y:''}
    createdTime:String
});

mongoose.model('contactus',contactusSchema);
