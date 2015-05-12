/**
 * Created by Administrator on 2015/4/22.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
    _id:String,
    createdTime:String,
    title:String,
    concat:String
});

mongoose.model('news',newsSchema);