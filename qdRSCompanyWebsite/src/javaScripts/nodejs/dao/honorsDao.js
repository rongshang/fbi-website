/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    HonorsModel = models.honors;

var HonorsDAO = function(honors) {
    this.honors=honors ||{};
};


HonorsDAO.prototype.save = function(honor,callback){
    var honorsModel = new HonorsModel(honor);
    honorsModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}


module.exports = HonorsDAO;




