/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//公司图片
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companyImgsSchema = new Schema({
    _id:String,
    image:String,
    createdTime:String
});

mongoose.model('companyimgs',companyImgsSchema);
