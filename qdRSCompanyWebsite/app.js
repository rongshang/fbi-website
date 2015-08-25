var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/routes');
//var users = require('./routes/users');
var session = require('express-session');
var url = require('url');
var querystring = require('querystring');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));

//这三句是设置成html格式
var ejs = require('ejs');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser({limit:'300mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));
//session
app.use(session({
  secret:'secret',
  cookie:{
    maxAge:1000*60*30
  }
}));

//登录拦截器
app.use(function(req, res, next){
  var url2 =url.format(req.originalUrl);
  var regExp = /^\/admin\//;
  var flag = regExp.test(url2);
  if (url2 != "/admin/login" && !req.session.userinfo&&flag) {
    console.log("登录拦截器提示：必须登录，才能执行此项操作。");
    return res.redirect("/admin/login");
  }
  next();
});


//图片上传配置
//app.use(require("multer")({
//  dest:__dirname + '/src/upload/images',
//  rename: function (fieldname, filename) {
//    var day = new Date();
//    var month = day.getMonth()+1;
//    var newname = day.getFullYear() + '-' +month+'-'+day.getDate()+'-'+day.getHours()+'-'+day.getMinutes()+'-'+day.getSeconds();
//    return filename.replace(/\W+/g, '-').toLowerCase() +newname
//  }
//}));
//配置结束

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
