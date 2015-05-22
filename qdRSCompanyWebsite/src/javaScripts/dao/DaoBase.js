/**
 * Created by Administrator on 2015/4/22.
 */
'use strict'
function DaoBase (Model){
    this.model = Model;
}

//create
DaoBase.prototype.create = function (doc,callback){
    this.model.create(doc, function (error) {
        if(error) return callback(error);
        return callback(doc);
    });
};

DaoBase.prototype.getById = function (id, callback) {
    this.model.findOne({_id:id}, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.countByQuery = function (query, callback) {
    this.model.count(query, function(error, model){
        if(error) return callback(error,null);
        return callback(null,model);
    });
};

DaoBase.prototype.getByQuery = function (query,fileds,opt,callback) {
    this.model.find(query, fileds, opt, function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    });
};

DaoBase.prototype.getAll = function (callback) {
    this.model.find({}, function(error,model){
        if(error) return callback(error,null);

        return callback(null, model);
    });
};

DaoBase.prototype.delete = function (query, callback){
    this.model.remove(query, function(error){
        if(error) return callback(error);

        return callback(null);
    });
};

DaoBase.prototype.update = function( conditions, update ,options, callback) {
    this.model.update(conditions, update, options, function (error) {
        if(error) return callback(error);
        return callback(null);
    });
};

DaoBase.prototype.findByLimit = function(count,callback){
    this.model.find().limit(count,function(error,model){
        if(error) return callback(error);

        return callback(null,model);
    });
};

DaoBase.prototype.findByLimitAndSortAndQuery = function(query,sort,count,callback){
    this.model.find(query,function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    }).sort(sort).limit(count)
}

DaoBase.prototype.findByLimitAndSort = function(sort,count,callback){
    this.model.find({},function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    }).sort(sort).limit(count)
}

DaoBase.prototype.findOneBySort = function(sort,callback){
    this.model.findOne({},function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    }).sort(sort)
}

DaoBase.prototype.findBySort = function(sort,callback){
    this.model.find({},function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    }).sort(sort)
}

DaoBase.prototype.findAllByPage = function(sort,pageNo,pageSize,callback){
    this.model.find({},function(error,model){
        if(error) return callback(error,null);

        return callback(null,model);
    }).sort(sort).limit(pageSize).skip((pageNo-1)*pageSize)
}

DaoBase.prototype.insertData = function (data,callback){
    console.log("-------"+data);
    this.model.save(data, function (error) {
        console.log("=========create============"+error);
        if(error) return callback(error);
        return callback(null);
    });
};

module.exports =DaoBase;