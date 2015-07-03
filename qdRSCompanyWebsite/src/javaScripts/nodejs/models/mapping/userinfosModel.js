/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//联系我们
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userinfosSchema = new Schema({
    _id:String,
    username:String,
    password:String,
    level:String,
    createdTime:String
});

mongoose.model('userinfos',userinfosSchema);
