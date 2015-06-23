/**
 * Created by Administrator on 2015/4/21.
 */
var mongoose = require('mongoose');
var databaseConfig = require('../../../config/databaseConfig');
var fs = require('fs');
var log = require('../../../log/log');

mongoose.connect(databaseConfig.connectionstring);

var db = mongoose.connection;
db.on('error', function(err){
    console.error('connect to %s error: ', databaseConfig.connectionstring, err.message);
    process.exit(1);
});
db.once('open', function () {
    log.success('%s has been connected.', databaseConfig.connectionstring);
});

var models_path = __dirname + '/../models/mapping'
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName);
});
