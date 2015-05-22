/**
 * Created by Administrator on 2015/5/12.
 */
var DaoBase = require('./DaoBase'),
    models = require('../models'),
    RecruitmentsModel = models.recruitments;

var RecruitmentsDAO = function(recruitments) {
    this.recruitments=recruitments ||{};
};
module.exports = RecruitmentsDAO;

