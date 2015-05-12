/**
 * Created by Administrator on 2015/5/7.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    PartnersModel = models.partners;

var PartnersDAO = function(partners) {
    this.partners=partners ||{};
};

module.exports = PartnersDAO;
var baseDao = new DaoBase(PartnersModel);
module.exports = baseDao;
