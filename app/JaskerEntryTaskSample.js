/**
 * Created by Franz on 1/21/2015.
 */

(function () {
    'use strict';
    var log = require('bunyan').createLogger({name: 'renameMe', level: 'debug'});
    var _ = require('lodash');
    var JaskerEntryTask = require('bsh-jasker').JaskerEntryTask;

    function JaskerEntryTaskSample () {
        JaskerEntryTask.call(this);
    }
    JaskerEntryTaskSample.prototype = Object.create(JaskerEntryTask.prototype);
    JaskerEntryTaskSample.prototype.constructor = JaskerEntryTaskSample;

    JaskerEntryTaskSample.prototype.perform = function (promise,document,state,stateData) {
        log.info('JaskerEntryTaskSample perform called !!!!!!!!!!!!!!!!!!!!!!!!!!!');
        promise.resolve();
    };
    module.exports = JaskerEntryTaskSample;
})();
