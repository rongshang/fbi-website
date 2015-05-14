/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//公司简介
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companyprofilesSchema = new Schema({
    _id:String,
    createdTime:String,
    concat:String
});

mongoose.model('companyprofiles',companyprofilesSchema);
