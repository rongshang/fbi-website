var moment = require('moment');

moment.locale('zh-cn');

exports.formatDate = function(date, formatString, friendly){
	date = moment(date);
	if(friendly){
		return date.fromNow();
	}else{
		return date.format(formatString);
	}
};

exports.cutString = function(string, sum){
	var str = string.toString();
	return str.substr(0, sum);
};