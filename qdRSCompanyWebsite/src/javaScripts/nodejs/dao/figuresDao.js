/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    FiguresModel = models.figures;

var FiguresDAO = function(figure) {
    this.figure=figure ||{};
};

module.exports = FiguresDAO;

