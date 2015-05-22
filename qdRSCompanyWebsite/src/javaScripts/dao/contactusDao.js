/**
 * Created by Administrator on 2015/5/14.
 */

'use strict'

var DaoBase = require('./DaoBase'),
    models = require('../models'),
    ContactusModel = models.contactus;

var ContactusDAO = function(contactus) {
    this.contactus=contactus ||{};
};

module.exports = ContactusDAO;

