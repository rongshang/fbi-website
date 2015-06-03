/**
 * Created by Administrator on 2015/5/19.
 */
'use strict'



app.directive('fileUpload', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0;i<files.length;i++) {
                    //emit event upward
                    scope.$emit("fileSelected", { file: files[i] });
                }
            });
        }
    };
});

//angular.module('directives', [])
//    .directive('fileupload', function() {
//        return {
//            restrict:'A',
//            scope: {
//                done: '&',
//                progress: '&'
//            },
//            link: function(scope, element, attrs) {
//                var optionsObj = {
//                    dataType: 'json'
//                };
//                if(scope.done) {
//                    optionsObj.done = function(e, data) {
//                        scope.$apply(function() {
//                            scope.done({e: e, data: data});
//                        });
//                    };
//                }
//                if(scope.progress) {
//                    optionsObj.progress = function(e, data) {
//                        scope.$apply(function() {
//                            scope.progress({e: e, data: data});
//                        });
//                    };
//                }
//                element.fileupload(optionsObj);
//            }
//        };
//    });
