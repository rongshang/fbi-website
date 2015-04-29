require.config({

    paths: {
        jquery: '../js/jquery-1.9.1.min.js',
        bootstrap: '../bootstrap/js/bootstrap.min.js',
        angular: '../angular/angular.min.js',
        angularResource: '../angular/angular-resource.min.js',
        html5shiv:'../js/html5shiv.min.js'

    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-resource' : {deps:['angular']},
        'bootstrap': {deps:['jquery']},
        //'mcustomscrollbar':{deps:['jquery']},
        'underscore': {exports: '_'}
        //'detectbrowser':{deps:['modernizr']}
        /*,
        'res':{exports:'res'}*/

    },
    priority: [
        "angular"
    ],/*,
    i18n: {
        locale: 'ja-jp'
    },*/
    urlArgs: 'v=1.0.0.1'
});

require(['../js/navigation.js'],
    function(_jj) {
        alert(_jj.fn.jquery);
    }
);