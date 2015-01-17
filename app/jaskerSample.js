/**
 * Created by Franz on 1/17/2015.
 */

(function () {
    'use strict';

    var log = require ('bunyan').createLogger({name:'jaskerSample', level : 'debug'});
    var jasker = require ('bsh-jasker');

    module.exports.jaskerSample = function () {
        var jaskerMap = new jasker.JaskerMap();
        jaskerMap.initilize({inline : {}});
    }
})();
