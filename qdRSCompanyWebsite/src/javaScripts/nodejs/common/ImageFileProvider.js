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

ImageFileProvider = function (host, port) {
   this.db = new Db('rswebsite', new Server(host, port, {auto_reconnect:true}, {}));
};

ImageFileProvider.prototype.insert = function (image, callback) {
    console.log(image);
    //var rename = tools.formatDate(new Date(),'YYYYMMDDHHmmss')+datapath.substring(datapath.length,datapath.lastIndexOf("."));
    this.db.open(function(err, db) {
        var gridStore = new GridStore(db, null, "w");
        //var prefix = "data:image/png;base64,";
        //var readData = fs.readFileSync(datapath);
        //×ª»»³Ébase64
        //var base64 = new Buffer(readData, 'binary').toString('base64');
        //var data = prefix+base64;
        gridStore.open(function(err, gridStore) {
            gridStore.write(image, function(err, gridStore) {
                gridStore.close(function(err, result) {
                    GridStore.read(db, result._id, function(err, fileData) {
                        //assert.equal(data.length, fileData.length);
                        db.close();
                        callback(result._id);
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