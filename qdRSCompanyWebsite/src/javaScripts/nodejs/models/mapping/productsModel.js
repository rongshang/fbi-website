/**
 * Created by Administrator on 2015/5/7.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    _id:String,
    createdTime:String,
    image:String,
    title:String,
    videosrc:String,
    websiteUrl:String,
    concat:String
});

mongoose.model('products',productsSchema);

