/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'
var DaoBase = require('./DaoBase'),
    models = require('../models'),
    HonorsModel = models.honors;

var HonorsDAO = function(honors) {
    this.honors=honors ||{};
};

module.exports = HonorsDAO;
var baseDao = new DaoBase(HonorsModel);
module.exports = baseDao;



