/**
 * Created by Franz on 1/20/2015.
 */

(function () {
    'use strict';
    var log = require('bunyan').createLogger({name: 'renameMe', level: 'debug'});
    var _ = require('lodash');
    var JaskerNextDecision = require('bsh-jasker').JaskerNextDecision;

    function JaskerNextDecisionSample() {
        JaskerNextDecision.call(this);
    }
    JaskerNextDecisionSample.prototype = Object.create(JaskerNextDecision.prototype);
    JaskerNextDecisionSample.prototype.constructor = JaskerNextDecisionSample;

    JaskerNextDecisionSample.prototype.next = function (document, state, stateData) {
        return ['sample5'];
    };

    module.exports = JaskerNextDecisionSample;
})(); 
