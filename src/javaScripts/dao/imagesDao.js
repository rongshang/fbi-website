/**
 * Created by Administrator on 2015/4/28.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    ImagesModel = models.images;

var ImagesDAO = function(images) {
    this.images=images ||{};
};
module.exports = ImagesDAO;

var baseDao = new DaoBase(ImagesModel);

module.exports = baseDao;
