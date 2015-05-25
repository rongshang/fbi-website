/**
 * Created by Administrator on 2015/5/14.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    CompanyimgsModel = models.companyimgs;

var CompanyimgsDAO = function(companyimgs) {
    this.companyimgs=companyimgs ||{};
};

module.exports = CompanyimgsDAO;

