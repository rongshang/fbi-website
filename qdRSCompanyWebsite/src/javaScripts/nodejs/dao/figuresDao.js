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


FiguresDAO.prototype.save = function(figure,callback){
    var figuresModel = new FiguresModel(figure);
    figuresModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}


module.exports = FiguresDAO;

