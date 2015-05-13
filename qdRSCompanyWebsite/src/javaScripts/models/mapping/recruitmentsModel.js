/**
 * Created by Administrator on 2015/5/12.
 */
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recruitmentsSchema = new Schema({
    _id:String,
    createdTime:String,
    job:String,
    count:String,
    address:String,
    salary:String,
    concat:String
});

mongoose.model('recruitments',recruitmentsSchema);
