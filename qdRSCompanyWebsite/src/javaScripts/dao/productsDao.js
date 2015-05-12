/**
 * Created by Administrator on 2015/5/7.
 */
'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    ProductsModel = models.products;

var ProductsDAO = function(products) {
    this.products=products ||{};
};
module.exports = ProductsDAO;
var baseDao = new DaoBase(ProductsModel);
module.exports = baseDao;
