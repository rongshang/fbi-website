/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
//资质荣誉
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var figuresSchema = new Schema({
    _id:String,
    job:String,
    name:String,
    image:String,
    honor:String,
    createdTime:String
});

mongoose.model('figures',figuresSchema);
