/**
 * Created by Administrator on 2015/5/14.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    EnterpriseculturesModel = models.enterprisecultures;

var EnterpriseculturesDAO = function(enterprisecultures) {
    this.enterprisecultures=enterprisecultures ||{};
};

EnterpriseculturesDAO.prototype.save = function(enterpriseculture,callback){
    var enterpriseculturesModel = new EnterpriseculturesModel(enterpriseculture);
    enterpriseculturesModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}
module.exports = EnterpriseculturesDAO;

