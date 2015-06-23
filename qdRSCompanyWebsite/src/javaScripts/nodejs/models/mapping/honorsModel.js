/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//资质荣誉
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var honorsSchema = new Schema({
    _id:String,
    createdTime:String,
    image:String
});

mongoose.model('honors',honorsSchema);
