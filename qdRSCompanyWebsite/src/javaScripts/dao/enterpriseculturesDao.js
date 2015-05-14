/**
 * Created by Administrator on 2015/5/14.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    EnterpriseculturesModel = models.enterprisecultures;

var EnterpriseculturesDAO = function(enterprisecultures) {
    this.enterprisecultures=enterprisecultures ||{};
};

module.exports = EnterpriseculturesDAO;
var baseDao = new DaoBase(EnterpriseculturesModel);
module.exports = baseDao;
