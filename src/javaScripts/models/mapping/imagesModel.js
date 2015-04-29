/**
 * Created by Administrator on 2015/4/28.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imagesSchema = new Schema({
    _id:String,
    uri:String,
    flag:String
});

mongoose.model('images',imagesSchema);
