/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//公司发展历程
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var developmentsSchema = new Schema({
    _id:String,
    createdTime:String,
    concat:String
});

mongoose.model('developments',developmentsSchema);
