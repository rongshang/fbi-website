/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    DevelopmentsModel = models.developments;

var DevelopmentsDAO = function(developments) {
    this.developments=developments ||{};
};

module.exports = DevelopmentsDAO;
var baseDao = new DaoBase(DevelopmentsModel);
module.exports = baseDao;
