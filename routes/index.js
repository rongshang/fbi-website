var express = require('express');
var router = express.Router();

/* GET home page. */

exports.welcome =function(req,res){
  var user = {"username":"huzhenyang","password":"123"};
  console.log(user);
  res.json(user);
  //res.render('../src/views/welcome', { title: 'Express' });
}

