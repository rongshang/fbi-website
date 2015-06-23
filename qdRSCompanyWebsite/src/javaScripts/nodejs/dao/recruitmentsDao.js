/**
 * Created by Administrator on 2015/5/12.
 */
var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    RecruitmentsModel = models.recruitments;

var RecruitmentsDAO = function(recruitments) {
    this.recruitments=recruitments ||{};
};

RecruitmentsDAO.prototype.save = function(recruitment,callback){
    var developmentsModel = new RecruitmentsModel(recruitment);
    developmentsModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}

module.exports = RecruitmentsDAO;

