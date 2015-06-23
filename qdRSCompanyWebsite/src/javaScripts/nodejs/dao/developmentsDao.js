/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    DevelopmentsModel = models.developments;

var DevelopmentsDAO = function(developments) {
    this.developments=developments ||{};
};

DevelopmentsDAO.prototype.save = function(development,callback){
    var developmentsModel = new DevelopmentsModel(development);
    developmentsModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}

module.exports = DevelopmentsDAO;

