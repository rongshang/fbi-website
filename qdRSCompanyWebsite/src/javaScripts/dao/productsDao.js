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

ProductsDAO.prototype.save = function(product,callback){
   var productsModel = new ProductsModel(product);
    productsModel.save(function(err){
        console.log("-----err----"+err);
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}

module.exports = ProductsDAO;

