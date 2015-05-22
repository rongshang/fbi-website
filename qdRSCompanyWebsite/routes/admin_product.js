/**
 * Created by Administrator on 2015/5/19.
 */

var uuid = require("uuid");
var fs = require("fs");
//产品模块
var products = require("../src/javaScripts/models").products;
var productsDao = require("../src/javaScripts/dao/productsDao");
var productsDao = new productsDao(products);

exports.adminProductAjax = function(req,res,next){
    var product=req.body.product;
    product =JSON.parse(product);
    product._id = uuid.v1();
    //上传开始
    var data = _.pick(req.body, 'type')
        , uploadPath = path.normalize('/upload/images')
        , file = req.files.file;

    console.log(file.name); //original name (ie: sunset.png)
    console.log(file.path); //tmp path (ie: /tmp/12345-xyaz.png)
    console.log(uploadPath); //uploads directory: (ie: /home/user/data/uploads)
    //上传结束
    productsDao.save(product,function(data){
        res.json(data);
    });
    //console.log("======"+uuid.v1()+"-------------"+req.files.codecsv);
    //if (req.files && req.files.codecsv != 'undifined') {
    //    var temp_path = req.files.codecsv.path;
    //    if (temp_path) {
    //        fs.readFile(temp_path, 'utf-8', function(err, content) {
    //            //文件的内容
    //            console.log('content',content);
    //            // 删除临时文件
    //            fs.unlink(temp_path);
    //        });
    //    }
    //}


}
