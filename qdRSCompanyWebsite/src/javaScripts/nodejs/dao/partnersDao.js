/**
 * Created by Administrator on 2015/5/7.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    PartnersModel = models.partners;

var PartnersDAO = function(partners) {
    this.partners=partners ||{};
};

PartnersDAO.prototype.save = function(partner,callback){
    var partnersModel = new PartnersModel(partner);
    partnersModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}

module.exports = PartnersDAO;

