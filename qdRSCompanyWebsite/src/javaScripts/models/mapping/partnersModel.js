/**
 * Created by Administrator on 2015/5/7.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var partnersSchema = new Schema({
    _id:String,
    title:String,
    concat:String,
    createdTime:String
});

mongoose.model('partners',partnersSchema);

