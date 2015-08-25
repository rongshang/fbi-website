/**
 * Created by MENG on 2015/5/28.
 */
angular.module('utils',[])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        };
    })
    .factory('httpRequest',['$http', function($http){
          return {
              get: function(url){
                  return $http.get(url);
              },
              post: function(url,data){
                  return $http.post(url,data);
              },
              delete: function(url){
                  return $http.delete(url);
              },
              put: function(url,data){
                  return $http.put(url,data);
              }
          }
    }])
    .factory('localstorage',['$window', function($window){
        return {
            set: function(key,value){
                $window.localStorage[key] = value;
            },
            get: function(key,defaultValue){
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key,value){
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key){
                return JSON.parse($window.localStorage[key]);
            }
        }
    }]);
