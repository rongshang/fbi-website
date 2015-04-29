/**
 * Created by Administrator on 2015/4/22.
 */
require("colors");
var slice = Array.prototype.slice;
exports.create = function (message) {
    var args = slice.call(arguments);
    args[0] = "Create:".green.inverse + message.green;
    console.log.apply(console, args);
};

exports.patch = function (message) {
    var args = slice.call(arguments);
    args[0] = "Patch:".blue.inverse + message.blue;
    console.log.apply(console, args);
};

exports.warn = function (message) {
    var args = slice.call(arguments);
    args[0] = "Warn:".yellow.inverse + message.yellow;
    console.log.apply(console, args);
};

exports.error = function (message) {
    var args = slice.call(arguments);
    args[0] = "Error:".red.inverse + message.red;
    console.log.apply(console, args);
};

exports.success = function (message) {
    var args = slice.call(arguments);
    args[0] = "Success:".green.inverse + message.green;
    console.log.apply(console, args);
};

exports.version = function (message) {
    var args = slice.call(arguments);
    args[0] = "Version:".green.inverse + message.green;
    console.log.apply(console, args);
};

exports.title = function (message) {
    var args = slice.call(arguments);
    args[0] = "Title:".green.inverse + message.green;
    console.log.apply(console, args);
};