var Db = require('mongodb').Db,
    fs = require('fs'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Code = require('mongodb').Code,
    assert = require('assert'),
    tools = require('./tools');

ImageFileProvider = function () {
    this.db = new Db('rswebsite', new Server('localhost', 27017, {auto_reconnect:true}, {}));
};

ImageFileProvider.prototype.insert = function (data, callback) {
    //var rename = tools.formatDate(new Date(),'YYYYMMDDHHmmss')+datapath.substring(datapath.length,datapath.lastIndexOf("."));
    this.db.open(function(err, db) {
        var fileId = new ObjectID();
        var gridStore = new GridStore(db, fileId, 'w');
        gridStore.open(function(err, gridStore) {
            gridStore.write(data, function(err, gridStore) {
                assert.equal(null, err);
                gridStore.close(function(err, result) {
                    assert.equal(null, err);
                    GridStore.exist(db, fileId, function(err, result) {
                        assert.equal(null, err);
                        assert.equal(true, result);
                        db.close();
                        callback(fileId);
                    });
                });
            });
        });
    });
};

ImageFileProvider.prototype.read = function (fileId, callback) {
    this.db.open(function(err, db) {
        var gridStore = new GridStore(db, null, "r");
        gridStore.open(function(err, gridStore) {
            GridStore.read(db, new ObjectID(fileId) , function(err, fileData) {
                if(err){
                    console.log(err);
                }else{
                    callback(fileData);
                }
                db.close();
            });


        });
    });
};

exports.ImageFileProvider = ImageFileProvider;