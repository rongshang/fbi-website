/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models/index'),
    ContactusModel = models.contactus;

var ContactusDAO = function(contactus) {
    this.contactus=contactus ||{};
};

//添加联系我们
ContactusDAO.prototype.save = function(contactus,callback){
    var contactusModel = new ContactusModel(contactus);
    contactusModel.save(function(err){
        if (err){
            return callback({msg:'0'});
        }
        return callback({msg:'1'});
    });
}

module.exports = ContactusDAO;

