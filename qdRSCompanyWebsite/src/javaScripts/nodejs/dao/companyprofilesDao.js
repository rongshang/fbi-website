/**
 * Created by Administrator on 2015/5/14.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    CompanyprofilesModel = models.companyprofiles;

var CompanyprofilesDAO = function(companyprofiles) {
    this.companyprofiles=companyprofiles ||{};
};

CompanyprofilesDAO.prototype.save = function(companyprofile,callback){
    var companyprofilesModel = new CompanyprofilesModel(companyprofile);
    companyprofilesModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}
module.exports = CompanyprofilesDAO;

