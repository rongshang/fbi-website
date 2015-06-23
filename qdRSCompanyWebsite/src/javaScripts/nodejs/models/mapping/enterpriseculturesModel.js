/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//公司文化
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var enterpriseculturesSchema = new Schema({
    _id:String,
    createdTime:String,
    concat:String
});

mongoose.model('enterprisecultures',enterpriseculturesSchema);
