/**
 * Created by Administrator on 2015/5/14.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    CompanyprofilesModel = models.companyprofiles;

var CompanyprofilesDAO = function(companyprofiles) {
    this.companyprofiles=companyprofiles ||{};
};

module.exports = CompanyprofilesDAO;
var baseDao = new DaoBase(CompanyprofilesModel);
module.exports = baseDao;
